package domain

type SuburbRes struct {
	PlaceID     int    `json:"place_id"`
	Licence     string `json:"licence"`
	OsmType     string `json:"osm_type"`
	OsmID       int    `json:"osm_id"`
	Lat         string `json:"lat"`
	Lon         string `json:"lon"`
	DisplayName string `json:"display_name"`
	Address     struct {
		Neighbourhood string `json:"neighbourhood"`
		Suburb        string `json:"suburb"`
		Hamlet        string `json:"hamlet"`
		StateDistrict string `json:"state_district"`
		State         string `json:"state"`
		Postcode      string `json:"postcode"`
		Country       string `json:"country"`
		CountryCode   string `json:"country_code"`
	} `json:"address"`
	Boundingbox []string `json:"boundingbox"`
}
