package domain

type File struct {
	Data	[]struct{
		DriverID			int		`json:"driver_id"`
		VehicleModel		int		`json:"vehicle_model"`
		Downgraded 			bool	`json:"downgraded"`
		DowngradedModels	[]int	`json:"downgraded_models"`
		Location 			struct{
			Address 		string	`json:"address"`
			Lat 			float64	`json:"lat"`
			Lng 			float64	`json:"lng"`
			Accuracy		float64	`json:"accuracy"`
			Speed 			float64 `json:"speed"`
			Time 			int64	`json:"time"`
			Bearing 		float64	`json:"bearing"`
		}	`json:"location"`
	}	`json:"data"`
}
