local json = require("json")
local io = require("io")

local function read_file(path)
	local file = io.open(path, "r")
	local content = file:read("*a")
	file:close()
	return content
end

local function write_file(path, content)
	local file = io.open(path, "w")
	file:write(content)
	file:close()
end

local function extract_items()
	local balatroGameCode = read_file("../Balatro/game.lua")
	local inFunction = false
	local initItemsFunction = ""

	for line in balatroGameCode:gmatch("([^\r\n]*)[\r\n]?") do
		-- Function where Balatro defines items such as jokers, seals, etc.
		if line:match("^function%s+Game:init_item_prototypes%s*%(") then
			inFunction = true
			initItemsFunction = initItemsFunction .. line .. "\n"
		elseif inFunction then
			-- Everything after this point involves save data, so we can stop here
			if line:match("self:save_progress()") then
				inFunction = false
				initItemsFunction = initItemsFunction .. "end\n"
				break
			end
			initItemsFunction = initItemsFunction .. line .. "\n"
		end
	end

	-- Mock out some functions used in the Balatro code
	function localize(string)
		return string
	end
	function HEX(string)
		return string
	end

	-- Provide an object for Balatro to populate with item data
	Game = {}

	-- Run Balatro's item initialization code
	loadstring(initItemsFunction)()
	Game:init_item_prototypes()

	-- Remove the initialization function since it can't be serialized
	Game.init_item_prototypes = nil

	write_file("../extracted/game.json", json.encode(Game))
end

local function extract_localization()
	local localizations = {
		"de",
		"en-us",
		"es_419",
		"es_ES",
		"fr",
		"id",
		"it",
		"ja",
		"ko",
		"nl",
		"pl",
		"pt_br",
		"ru",
		"zh_CN",
		"zh_TW",
	}

	for _, locale in ipairs(localizations) do
		local localizationCode = read_file("../Balatro/localization/" .. locale .. ".lua")
		local localization = loadstring(localizationCode)()

		write_file("../extracted/localization/" .. locale .. ".json", json.encode(localization))
	end
end

local function extract_images()
	local imageContent = read_file("../Balatro/resources/textures/2x/Jokers.png")
	write_file("../extracted/Jokers.png", imageContent)
end

extract_items()
extract_localization()
extract_images()
