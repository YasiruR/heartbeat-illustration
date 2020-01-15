package drivers

import (
	"encoding/json"
	"fmt"
	"gitlab.mytaxi.lk/pickme/go/log"
	"heartbeat-illustration/backend/domain"
	"io/ioutil"
	"math/rand"
	"net/http"
	"strconv"
)

const (
	driverPrefix = `backend/drivers/drivers.go`
	fileName = `../locations.json`
)

var apiResponse domain.APIResponse

func GetAllDrivers(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-type", "application/json")

	fmt.Println(`got request`)

	err := json.NewEncoder(res).Encode(apiResponse)
	if err != nil {
		log.Error(log.WithPrefix(driverPrefix, err))
	}
}

func GetPastDrivers(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-type", "application/json")

	var pastDriverResponse domain.APIResponse
	pastDriverResponse.Drivers = setPastDriverList()

	err := json.NewEncoder(res).Encode(pastDriverResponse)
	if err != nil {
		log.Error(log.WithPrefix(driverPrefix, err))
	}
}

func setPastDriverList() []domain.Driver {
	driverList := apiResponse.Drivers

	firstIndex := rand.Intn(len(driverList)/2)
	lastIndex := rand.Intn(len(driverList)/2) + len(driverList)/2

	pastDriverList := driverList[firstIndex: lastIndex]

	return pastDriverList
}

func SetDriverList() {
	//res, err := http.Get(locationService)
	//if err != nil {
	//	log.Error(log.WithPrefix(driverPrefix, err))
	//}
	//
	//content, err := ioutil.ReadAll(res.Body)
	//if err != nil {
	//	log.Error(log.WithPrefix(driverPrefix, err))
	//}

	content, err := ioutil.ReadFile(fileName)
	if err != nil {
		log.Error(log.WithPrefix(driverPrefix, err))
	}

	var data domain.File
	err = json.Unmarshal(content, &data)
	if err != nil {
		log.Error(log.WithPrefix(driverPrefix, err))
	}

	var driverList []domain.Driver

	//var wg sync.WaitGroup
	//mutex := &sync.Mutex{}
	//for index, fileDriver := range data.Data {
	//	if index == 30 {
	//		break
	//	}
	//	wg.Add(1)
	//	go func() {
	//		var driver domain.Driver
	//		driver.ID = fileDriver.DriverID
	//		driver.VehicleModel = findVehicleModel(fileDriver.VehicleModel)
	//		driver.Location.Lat = fileDriver.Location.Lat
	//		driver.Location.Lng = fileDriver.Location.Lng
	//		driver.Direction = findDirection(fileDriver.Location.Bearing)
	//		driver.Suburb = findSuburb(fileDriver.Location.Lng, fileDriver.Location.Lat)
	//
	//		mutex.Lock()
	//		driverList = append(driverList, driver)
	//		mutex.Unlock()
	//
	//		wg.Done()
	//	}()
	//}
	//wg.Wait()

	for index, fileDriver := range data.Data {
		if index == 30 {
			break
		}
		var driver domain.Driver
		driver.ID = fileDriver.DriverID
		driver.VehicleModel = findVehicleModel(fileDriver.VehicleModel)
		driver.Location.Lat = fileDriver.Location.Lat
		driver.Location.Lng = fileDriver.Location.Lng
		driver.Direction = findDirection(fileDriver.Location.Bearing)
		driver.Suburb = findSuburb(fileDriver.Location.Lng, fileDriver.Location.Lat)
		driverList = append(driverList, driver)

		fmt.Print("\rDrivers Loaded : ", index+1, `/30`)
	}

	apiResponse.Drivers = driverList
}

func findVehicleModel(modelID int) string {
	switch modelID {
	case 1:
		return `Tuk`
	case 2:
		return `Mini`
	case 3:
		return `Car`
	case 6:
		return `VIP`
	case 7:
		return `Jeep`
	case 10:
		return `Van`
	case 12:
		return `AID`
	case 15:
		return `SOS`
	case 16:
		return `Air Lift`
	case 4:
		return `Nano`
	case 17:
		return `Vesak`
	case 18:
		return `Bike`
	case 19:
		return `Budget`
	case 24:
		return `Minivan`
	case 29:
		return `Light Open`
	case 34:
		return `Light`
	case 38:
		return `Mover Open`
	case 42:
		return `Mover`
	case 43:
		return `Food`
	case 44:
		return `Buddy`
	case 45:
		return `Safari Light`
	case 46:
		return `Safari Max`
	case 47:
		return `Shuttle`
	default:
		return `Not Recognized`
    }
}

func findDirection(bearing float64) string{
	if (337.5<=bearing && bearing<=360) || (0<=bearing && bearing<22.5) {
		return `N`
	} else if bearing<47.5 {
		return `NE`
    } else if bearing<112.5 {
		return `E`
	} else if bearing<157.5 {
		return `SE`
    } else if bearing<202.5 {
		return `S`
	} else if bearing<247.5 {
		return `SW`
    } else if bearing<292.5 {
		return `W`
	} else if bearing<337.5 {
		return `SE`
    } else {
		return `N/A`
    }
}

func findSuburb(lng, lat float64) string {
	strLng := strconv.FormatFloat(lng, 'f', -1, 64)
	strLat := strconv.FormatFloat(lat, 'f', -1, 64)
	url := "http://nominatim.openstreetmap.org/reverse?format=json&lat=" + strLat + "&lon=" + strLng + "&zoom=18&addressdetails=1"

	res, err := http.Get(url)
	if err != nil {
		log.Error(log.WithPrefix(driverPrefix, err))
	}

	content, err := ioutil.ReadAll(res.Body)
	if err != nil {
		log.Error(log.WithPrefix(driverPrefix, err))
	}

	var suburbRes domain.SuburbRes
	err = json.Unmarshal(content, &suburbRes)
	if err != nil {
		log.Error(log.WithPrefix(driverPrefix, err))
	}

	return suburbRes.Address.Suburb
}