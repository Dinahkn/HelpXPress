using HelpProjectServer.Data;
using HelpProjectServer.Data.DTO;
using HelpProjectServer.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HelpProjectServer.Services
{
    public class CityService
    {
        private readonly HelpDBContext m_db;
        public CityService(HelpDBContext db)
        {
            m_db = db;
        }
        public List<CityDTO> GetCities()
        {
            return m_db.City
                .Select(c=>new CityDTO(){
                    IDCity = c.IDCity,
                    CityName = c.CityName
                })
                .ToList();
        }
        public CityDTO GetCity(int id)
        {
            return m_db.City
                .Where(city => city.IDCity == id)
                .Select(e => new CityDTO()
                {
                    IDCity=e.IDCity,
                    CityName = e.CityName
                }).FirstOrDefault();
        }
        public bool AddCity(CityDTO myCity)
        {
            if (!cityExist(myCity.CityName))
            {
                City newCity = new City();
                newCity.CityName = myCity.CityName;
                newCity.CityCountry = "ישראל";
                m_db.City.Add(newCity);
                int c = m_db.SaveChanges();
                return c > 0;
            }
            return false;
        }
        protected bool cityExist(string city)
        {
            return m_db.City.Any(ci => ci.CityName == city);
        }
        public City getCityForDelUpd(int id)
        {
            return m_db.City
                .Where(city => city.IDCity == id)
                .FirstOrDefault();
        }
        public ResponseDTO UpdateCity(int id,CityDTO cityToUpdate)
        {
            City cityFromDB = getCityForDelUpd(id);
            if (cityFromDB == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"City {cityToUpdate.CityName} with id:{id} not found in the database."
                };
            }
            cityFromDB.CityName = cityToUpdate.CityName;
            m_db.City.Update(cityFromDB);
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
        public ResponseDTO DeleteCity(int id)
        {
            City cityToDelete = getCityForDelUpd(id);
            if (cityToDelete == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Entity with id:{id} not found in the database."
                };
            }
            m_db.City.Remove(cityToDelete);
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
