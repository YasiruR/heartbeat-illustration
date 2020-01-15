package domain

type Driver struct {
	ID 				int			`json:"id"`
	VehicleModel 	string		`json:"vehicle_model"`
	Location 		struct {
		Lat 	float64		`json:"lat"`
		Lng		float64		`json:"lng"`
	}		`json:"location"`
	Suburb			string		`json:"suburb"`
	Direction 		string		`json:"direction"`
}

type APIResponse struct {
	Drivers 		[]Driver		`json:"drivers"`
}