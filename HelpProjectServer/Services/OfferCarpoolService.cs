using HelpProjectServer.Data;
using HelpProjectServer.Data.DTO;
using HelpProjectServer.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HelpProjectServer.Services
{
    public class OfferCarpoolService
    {
        private readonly HelpDBContext m_db;
        public OfferCarpoolService(HelpDBContext db)
        {
            m_db = db;
        }
        public List<OfferCarpoolsDTO> GetOfferCarpoolByCities(int idCityDeparture,int idCityArrival)
        {
            var e = m_db.OfferCarpools
                .Include(i => i.Users)
                .Where(carpool => carpool.IDCityDeparture == idCityDeparture
                && carpool.IDCityArrival == idCityArrival)
                .Select(ee =>
                new OfferCarpoolsDTO()
                {
                    IDCarpool=ee.IDCarpool,
                    IDUser=ee.IDUser,
                    IDCityDeparture=ee.IDCityDeparture,
                    IDCityArrival=ee.IDCityArrival,
                    DateHourDeparture = ee.DateHourDeparture,
                    DepartureLatitude = ee.DepartureLatitude,
                    DepartureLongitude = ee.DepartureLongitude,
                    ArrivalLatitude = ee.ArrivalLatitude,
                    ArrivalLongitude = ee.ArrivalLongitude,
                    Price = ee.Price,
                    CarModel = ee.CarModel,
                    Comments = ee.Comments,
                    FullName = ee.Users.FullName,
                    Mail = ee.Users.Mail,
                    Phone = ee.Users.Phone,
                    CityDeparture = ee.CityDeparture.CityName,
                    CityArrival = ee.CityArrival.CityName
                }).ToList();
            return e;
        }
        public List<OfferCarpoolsDTO> GetOfferCarpoolByCitiesDate(int idCityDeparture, int idCityArrival, DateTime date)
        {
            var e = m_db.OfferCarpools
                .Include(i => i.Users)
                .Where(carpool => carpool.IDCityDeparture == idCityDeparture
                && carpool.IDCityArrival == idCityArrival
                && carpool.DateHourDeparture.Date == date.Date)
                .Select(ee =>
                new OfferCarpoolsDTO()
                {
                    IDCarpool = ee.IDCarpool,
                    IDUser = ee.IDUser,
                    IDCityDeparture = ee.IDCityDeparture,
                    IDCityArrival = ee.IDCityArrival,
                    DateHourDeparture = ee.DateHourDeparture,
                    DepartureLatitude = ee.DepartureLatitude,
                    DepartureLongitude = ee.DepartureLongitude,
                    ArrivalLatitude = ee.ArrivalLatitude,
                    ArrivalLongitude = ee.ArrivalLongitude,
                    Price = ee.Price,
                    CarModel = ee.CarModel,
                    Comments = ee.Comments,
                    FullName = ee.Users.FullName,
                    Mail = ee.Users.Mail,
                    Phone = ee.Users.Phone,
                    CityDeparture = ee.CityDeparture.CityName,
                    CityArrival = ee.CityArrival.CityName
                }).ToList();
            return e;
        }
        public List<OfferCarpoolsDTO> GetOfferCarpools()
        {
            var e = m_db.OfferCarpools
                .Include(i => i.Users)
                .Select(ee =>
                new OfferCarpoolsDTO()
                {
                    IDCarpool = ee.IDCarpool,
                    IDUser = ee.IDUser,
                    IDCityDeparture = ee.IDCityDeparture,
                    IDCityArrival = ee.IDCityArrival,
                    DateHourDeparture = ee.DateHourDeparture,
                    DepartureLatitude = ee.DepartureLatitude,
                    DepartureLongitude = ee.DepartureLongitude,
                    ArrivalLatitude = ee.ArrivalLatitude,
                    ArrivalLongitude = ee.ArrivalLongitude,
                    Price = ee.Price,
                    CarModel = ee.CarModel,
                    Comments = ee.Comments,
                    FullName = ee.Users.FullName,
                    Mail = ee.Users.Mail,
                    Phone = ee.Users.Phone,
                    CityDeparture = ee.CityDeparture.CityName,
                    CityArrival = ee.CityArrival.CityName
                }).ToList();
            return e;       
        }
        public OfferCarpoolsDTO GetOfferCarpool(int id)
        {
            return m_db.OfferCarpools
                .Where(carpool => carpool.IDCarpool == id)
                .Select(ee =>
                new OfferCarpoolsDTO()
                {
                    IDCarpool = ee.IDCarpool,
                    IDUser = ee.IDUser,
                    IDCityDeparture = ee.IDCityDeparture,
                    IDCityArrival = ee.IDCityArrival,
                    DateHourDeparture = ee.DateHourDeparture,
                    DepartureLatitude = ee.DepartureLatitude,
                    DepartureLongitude = ee.DepartureLongitude,
                    ArrivalLatitude = ee.ArrivalLatitude,
                    ArrivalLongitude = ee.ArrivalLongitude,
                    Price = ee.Price,
                    CarModel = ee.CarModel,
                    Comments = ee.Comments,
                    FullName = ee.Users.FullName,
                    Mail = ee.Users.Mail,
                    Phone = ee.Users.Phone,
                    CityDeparture = ee.CityDeparture.CityName,
                    CityArrival = ee.CityArrival.CityName
                }).FirstOrDefault();
        }
        public List<OfferCarpoolsDTO> GetOfferCarpoolByUserID(int userID)
        {
            var e = m_db.OfferCarpools
                .Include(i => i.Users)
                .Where(carpool => carpool.IDUser == userID)
                .Select(ee =>
                new OfferCarpoolsDTO()
                {
                    IDCarpool = ee.IDCarpool,
                    IDUser = ee.IDUser,
                    IDCityDeparture = ee.IDCityDeparture,
                    IDCityArrival = ee.IDCityArrival,
                    DateHourDeparture = ee.DateHourDeparture,
                    DepartureLatitude = ee.DepartureLatitude,
                    DepartureLongitude = ee.DepartureLongitude,
                    ArrivalLatitude = ee.ArrivalLatitude,
                    ArrivalLongitude = ee.ArrivalLongitude,
                    Price = ee.Price,
                    CarModel = ee.CarModel,
                    Comments = ee.Comments,
                    FullName = ee.Users.FullName,
                    Mail = ee.Users.Mail,
                    Phone = ee.Users.Phone,
                    CityDeparture = ee.CityDeparture.CityName,
                    CityArrival = ee.CityArrival.CityName
                }).ToList();
            return e;
        }
        public bool AddOfferCarpool(OfferCarpoolsDTO carpool)
        {
            OfferCarpools newCarpool = new OfferCarpools();
            newCarpool.IDHelp = 3;
            newCarpool.IDUser = carpool.IDUser;
            newCarpool.IDCityDeparture = carpool.IDCityDeparture;
            newCarpool.IDCityArrival = carpool.IDCityArrival;
            newCarpool.DateHourDeparture = carpool.DateHourDeparture.ToLocalTime();
            newCarpool.DepartureLatitude = carpool.DepartureLatitude;
            newCarpool.DepartureLongitude = carpool.DepartureLongitude;
            newCarpool.ArrivalLatitude = carpool.ArrivalLatitude;
            newCarpool.ArrivalLongitude = carpool.ArrivalLongitude;
            newCarpool.Price = carpool.Price;
            newCarpool.CarModel = carpool.CarModel;
            newCarpool.Comments = carpool.Comments;
            m_db.OfferCarpools.Add(newCarpool);
            int c = m_db.SaveChanges();
            return c > 0;
        }
        public OfferCarpools getOfferCarpoolForDelUpd(int id)
        {
            return m_db.OfferCarpools
                .Where(carpool=>carpool.IDCarpool==id)
                .FirstOrDefault();
        }
        public ResponseDTO UpdateOfferCarpool(int id, OfferCarpoolsDTO carpoolToUpdate)
        {
            OfferCarpools carpoolFromDB = getOfferCarpoolForDelUpd(id);
            if (carpoolFromDB == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Carpool {carpoolToUpdate.FullName} with id:{id} not found in the database."
                };
            }
            carpoolFromDB.IDCityDeparture = carpoolToUpdate.IDCityDeparture;
            carpoolFromDB.IDCityArrival = carpoolToUpdate.IDCityArrival;
            carpoolFromDB.DateHourDeparture = carpoolToUpdate.DateHourDeparture;
            carpoolFromDB.DepartureLatitude = carpoolToUpdate.DepartureLatitude;
            carpoolFromDB.DepartureLongitude = carpoolToUpdate.DepartureLongitude;
            carpoolFromDB.ArrivalLatitude = carpoolToUpdate.ArrivalLatitude;
            carpoolFromDB.ArrivalLongitude = carpoolToUpdate.ArrivalLongitude;
            carpoolFromDB.Price = carpoolToUpdate.Price;
            carpoolFromDB.CarModel = carpoolToUpdate.CarModel;
            carpoolFromDB.Comments = carpoolToUpdate.Comments;
            m_db.OfferCarpools.Update(carpoolFromDB);
            int c = m_db.SaveChanges();
            ResponseDTO response = new ResponseDTO();
            if (c > 0)
                response.Status = StatusCode.Success;
            else
            {
                response.Status = StatusCode.Error;
                response.StatusText = $"Failed when trying changes";
            }
            return response;
        }
        public ResponseDTO DeleteOfferCarpool(int id)
        {
            OfferCarpools carpoolToDelete = getOfferCarpoolForDelUpd(id);
            if (carpoolToDelete == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Entity with id:{id} not found in the database."
                };
            }
            m_db.OfferCarpools.Remove(carpoolToDelete);
            int c = m_db.SaveChanges();
            ResponseDTO response = new ResponseDTO();
            if (c > 0)
                response.Status = StatusCode.Success;
            else
            {
                response.Status = StatusCode.Error;
                response.StatusText = $"Failed whem trying save changes";
            }
            return response;
        }
    }
}
