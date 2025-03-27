local dkjson = require("dkjson")
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

local function extract_loc_vars(centers)
	local balatroCardCode = read_file("../Balatro/card.lua")
	local inFunction = false
	local initLocVarsFunction = ""

	for line in balatroCardCode:gmatch("([^\r\n]*)[\r\n]?") do
		-- Function where Balatro defines which localization variables to use
		if line:match("^function%s+Card:generate_UIBox_ability_table%s*%(") then
			inFunction = true
			initLocVarsFunction = initLocVarsFunction .. line .. "\n"
		elseif inFunction then
			-- Everything after this point is irrelevant
			if line:match("local badges = {}") then
				inFunction = false
				initLocVarsFunction = initLocVarsFunction .. "LocVars[self.ability.name] = loc_vars\nend\n"
				break
			end
			initLocVarsFunction = initLocVarsFunction .. line .. "\n"
		end
	end

	-- Mock out some functions used in the Balatro code

	-- Provide an object for Balatro to populate with item data
	LocVars = {}
	Card = {}
	G = {
		UIT = {},
		GAME = {
			current_round = {
				idol_card = { rank = "Ace", suit = "Spades" },
				ancient_card = { suit = "Spades" },
				castle_card = { suit = "Spades" },
				mail_card = { rank = "Ace" },
			},
			probabilities = {
				normal = 1,
			},
			dollars = 0,
			consumeable_usage = {},
		},
		C = {
			SUITS = {
				Hearts = HEX("FE5F55"),
				Diamonds = HEX("FE5F55"),
				Spades = HEX("374649"),
				Clubs = HEX("424e54"),
			},
			UI = {
				TEXT_DARK = HEX("374649"),
			},
		},
	}
	function DynaText() end
	loadstring(initLocVarsFunction)()

	for _, center in pairs(centers) do
		if center.set == "Joker" then
			if not center.extra then
				center.extra = center.config.extra
			end
			if center.config.Xmult then
				center.x_mult = center.config.Xmult
			end
			Card.bypass_lock = true
			Card.ability = center
			Card.config = {
				center = {
					unlocked = true,
				},
			}
			Card:generate_UIBox_ability_table()

			local loc_vars = LocVars[center.name]
			center.loc_vars = loc_vars or {}
			print(require("inspect")({ center.name, center.loc_vars }))
		end
	end
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

	-- Extract localization variables
	extract_loc_vars(Game.P_CENTERS)

	write_file("../extracted/game.json", dkjson.encode(Game))
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

		write_file("../extracted/localization/" .. locale .. ".json", dkjson.encode(localization))
	end
end

local function extract_images()
	local imageContent = read_file("../Balatro/resources/textures/2x/Jokers.png")
	write_file("../extracted/Jokers.png", imageContent)
end

extract_items()
extract_localization()
extract_images()
