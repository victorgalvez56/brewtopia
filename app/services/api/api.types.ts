import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"
import { Api, Auth, Beer, Brewery, Pub, User, Achievement } from "../../models"
import { BeerStyle } from "../../models/beer-style/beer-style"

export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem

//APi
export type GetApiResult = { kind: "ok"; result: Api } | GeneralApiProblem
export type GetLoginResult = { kind: "ok"; data: Auth } | GeneralApiProblem
export type GetRegisterResult = { kind: "ok"; register: Api } | GeneralApiProblem
export type GetLogoutResult = { kind: "ok"; logout: Api } | GeneralApiProblem
export type GetForgotPasswordResult = { kind: "ok"; forgot: Api } | GeneralApiProblem

export type GetBeersResult = { kind: "ok"; beers: Beer[] } | GeneralApiProblem
export type GetBeerResult = { kind: "ok"; beer: Beer } | GeneralApiProblem

export type GetBreweriesResult = { kind: "ok"; breweries: Brewery[] } | GeneralApiProblem
export type GetBreweryResult = { kind: "ok"; brewery: Brewery } | GeneralApiProblem
export type GetBreweryRatingsResult = { kind: "ok"; ratings: Brewery[] } | GeneralApiProblem

export type GetPubsResult = { kind: "ok"; pubs: Pub[] } | GeneralApiProblem
export type GetPubsTopResult = { kind: "ok"; pubs_top: Pub[] } | GeneralApiProblem
export type GetPubsSearchResult = { kind: "ok"; pubs_search: Pub[] } | GeneralApiProblem
export type GetSearchPubsByLocationResult = { kind: "ok"; near: Pub[] } | GeneralApiProblem

export type GetBeerStylesResult = { kind: "ok"; beer_styles: BeerStyle[] } | GeneralApiProblem

export type UploadBeerResult = { kind: "ok"; result: Api } | GeneralApiProblem

export type GetAchievementsResult = { kind: "ok"; achievements: Achievement[] } | GeneralApiProblem

export type UploadAchievementsResult = { kind: "ok"; result: Api } | GeneralApiProblem
