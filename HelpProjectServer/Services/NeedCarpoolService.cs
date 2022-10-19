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
    public class NeedCarpoolService
    {
        private readonly HelpDBContext m_db;
        public NeedCarpoolService(HelpDBContext db)
        {
            m_db = db;
        }
        public List<NeedCarpoolsDTO> GetNeedCarpoolByUserID(int userID)
        {
            var e = m_db.NeedCarpools
                .Include(i => i.Users)
                .Where(carpool => carpool.IDUser == userID)
                .Select(ee =>
                new NeedCarpoolsDTO()
                {
                    IDNeedCarpool = ee.IDNeedCarpool,
                    IDUser = ee.IDUser,
                    IDCityDeparture = ee.IDCityDeparture,
                    IDCityArrival = ee.IDCityArrival,
                    DateHourDeparture = ee.DateHourDeparture,
                    DepartureLatitude = ee.DepartureLatitude,
                    DepartureLongitude = ee.DepartureLongitude,
                    ArrivalLatitude = ee.ArrivalLatitude,
                    ArrivalLongitude = ee.ArrivalLongitude,
                    Comments = ee.Comments,
                    FullName = ee.Users.FullName,
                    Mail = ee.Users.Mail,
                    Phone = ee.Users.Phone,
                    CityDeparture = ee.CityDeparture.CityName,
                    CityArrival = ee.CityArrival.CityName
                }).ToList();
            return e;
        }
        public List<NeedCarpoolsDTO> GetNeedCarpools()
        {
            var e = m_db.NeedCarpools
                .Include(i => i.Users)
                .Select(ee =>
                new NeedCarpoolsDTO()
                {
                    IDNeedCarpool = ee.IDNeedCarpool,
                    IDUser = ee.IDUser,
                    IDCityDeparture = ee.IDCityDeparture,
                    IDCityArrival = ee.IDCityArrival,
                    DateHourDeparture = ee.DateHourDeparture,
                    DepartureLatitude = ee.DepartureLatitude,
                    DepartureLongitude = ee.DepartureLongitude,
                    ArrivalLatitude = ee.ArrivalLatitude,
                    ArrivalLongitude = ee.ArrivalLongitude,
                    Comments = ee.Comments,
                    FullName = ee.Users.FullName,
                    Mail = ee.Users.Mail,
                    Phone = ee.Users.Phone,
                    CityDeparture = ee.CityDeparture.CityName,
                    CityArrival = ee.CityArrival.CityName
                }).ToList();
            return e;
        }
        public NeedCarpoolsDTO GetNeedCarpool(int id)
        {
            return m_db.NeedCarpools
                .Where(carpool => carpool.IDNeedCarpool == id)
                .Select(e =>
                new NeedCarpoolsDTO()
                {
                    IDNeedCarpool = e.IDNeedCarpool,
                    IDUser = e.IDUser,
                    IDCityDeparture = e.IDCityDeparture,
                    IDCityArrival = e.IDCityArrival,
                    DateHourDeparture = e.DateHourDeparture,
                    DepartureLatitude = e.DepartureLatitude,
                    DepartureLongitude = e.DepartureLongitude,
                    ArrivalLatitude = e.ArrivalLatitude,
                    ArrivalLongitude = e.ArrivalLongitude,
                    Comments = e.Comments,
                    FullName = e.Users.FullName,
                    Mail = e.Users.Mail,
                    Phone = e.Users.Phone,
                    CityDeparture = e.CityDeparture.CityName,
                    CityArrival = e.CityArrival.CityName
                }).FirstOrDefault();
        }
        public bool AddNeedCarpool(NeedCarpoolsDTO carpool)
        {
            NeedCarpools newNeedCarpool = new NeedCarpools();
            newNeedCarpool.IDHelp = 3;
            newNeedCarpool.IDUser = carpool.IDUser;
            newNeedCarpool.IDCityDeparture = carpool.IDCityDeparture;
            newNeedCarpool.IDCityArrival = carpool.IDCityArrival;
            newNeedCarpool.DateHourDeparture = carpool.DateHourDeparture;
            newNeedCarpool.DepartureLatitude = carpool.DepartureLatitude;
            newNeedCarpool.DepartureLongitude = carpool.DepartureLongitude;
            newNeedCarpool.ArrivalLatitude = carpool.ArrivalLatitude;
            newNeedCarpool.ArrivalLongitude = carpool.ArrivalLongitude;
            newNeedCarpool.Comments = carpool.Comments;
            m_db.NeedCarpools.Add(newNeedCarpool);
            int c = m_db.SaveChanges();
            return c > 0;
        }
        public NeedCarpools getNeedCarpoolForDelUpd(int id)
        {
            return m_db.NeedCarpools
                .Where(carpool => carpool.IDNeedCarpool == id)
                .FirstOrDefault();
        }
        public ResponseDTO UpdateNeedCarpool(int id, NeedCarpoolsDTO needCarpoolToUpdate)
        {
            NeedCarpools needCarpoolFromDB = getNeedCarpoolForDelUpd(id);
            if (needCarpoolFromDB == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Carpool {needCarpoolToUpdate.FullName} with id:{id} not found in the database."
                };
            }
            needCarpoolFromDB.IDCityDeparture = needCarpoolToUpdate.IDCityDeparture;
            needCarpoolFromDB.IDCityArrival = needCarpoolToUpdate.IDCityArrival;
            needCarpoolFromDB.DateHourDeparture = needCarpoolToUpdate.DateHourDeparture;
            needCarpoolFromDB.DepartureLatitude = needCarpoolToUpdate.DepartureLatitude;
            needCarpoolFromDB.DepartureLongitude = needCarpoolToUpdate.DepartureLongitude;
            needCarpoolFromDB.ArrivalLatitude = needCarpoolToUpdate.ArrivalLatitude;
            needCarpoolFromDB.ArrivalLongitude = needCarpoolToUpdate.ArrivalLongitude;
            needCarpoolFromDB.Comments = needCarpoolToUpdate.Comments;
            m_db.NeedCarpools.Update(needCarpoolFromDB);
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
        public ResponseDTO DeleteNeedCarpool(int id)
        {
            NeedCarpools needCarpoolToDelete = getNeedCarpoolForDelUpd(id);
            if (needCarpoolToDelete == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Entity with id:{id} not found in the database."
                };
            }
            m_db.NeedCarpools.Remove(needCarpoolToDelete);
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
