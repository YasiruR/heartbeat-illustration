package main

import (
	"github.com/gorilla/mux"
	"heartbeat-illustration/backend/drivers"
	"log"
	"net/http"
)

func main() {
	drivers.SetDriverList()
	router := mux.NewRouter()

	router.HandleFunc("/drivers/current", drivers.GetAllDrivers).Methods("GET")
	router.HandleFunc("/drivers/past", drivers.GetPastDrivers).Methods("GET")

	log.Fatal(http.ListenAndServe(`:9000`, router))
}
