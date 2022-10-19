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
    public class OfferBabysittersService
    {
        private readonly HelpDBContext m_db;
        public OfferBabysittersService(HelpDBContext db)
        {
            m_db = db;
        }
        public List<OfferBabysittersDTO> GetOfferBabysitters()
        {            
            var e = m_db.Babysitters
                .Include(i => i.Users)
                .Select(ee =>
                new OfferBabysittersDTO()
                {
                    IDBabysitter=ee.IDBabysitter,
                    IDUser = ee.IDUser,
                    FullName = ee.Users.FullName,
                    Mail = ee.Users.Mail,
                    Phone = ee.Users.Phone,
                    IDCity = ee.IDCity,
                    City =ee.City.CityName,
                    Price = ee.Price,
                    DateBabysitter = ee.DateBabysitter,
                    YearsExperience = ee.YearsExperience,
                    TimeSlice1 = ee.TimeSlice1,
                    TimeSlice2 = ee.TimeSlice2,
                    TimeSlice3 = ee.TimeSlice3,
                    TimeSlice4 = ee.TimeSlice4,
                    Comments = ee.Comments
                }).ToList();
            return e;           
        }
        public OfferBabysittersDTO GetOfferBabysitter(int id)
        {
            return m_db.Babysitters
                .Where(babysitter => babysitter.IDBabysitter == id)
                .Select(ee =>
                new OfferBabysittersDTO()
                {
                    IDBabysitter = ee.IDBabysitter,
                    IDUser = ee.IDUser,
                    FullName = ee.Users.FullName,
                    Mail = ee.Users.Mail,
                    Phone = ee.Users.Phone,
                    IDCity = ee.IDCity,
                    City = ee.Users.City.CityName,
                    YearsExperience = ee.YearsExperience,
                    DateBabysitter = ee.DateBabysitter,
                    Price = ee.Price,
                    TimeSlice1 = ee.TimeSlice1,
                    TimeSlice2 = ee.TimeSlice2,
                    TimeSlice3 = ee.TimeSlice3,
                    TimeSlice4 = ee.TimeSlice4,
                    Comments = ee.Comments
                }).FirstOrDefault();
        }
        public List<OfferBabysittersDTO> GetOfferBabysittersByCity(int idCity)
        {
            var e = m_db.Babysitters
                .Include(i => i.Users)
                .Where(bbsit => bbsit.IDCity == idCity)
                .Select(ee =>
                new OfferBabysittersDTO()
                {
                    IDBabysitter = ee.IDBabysitter,
                    IDUser = ee.IDUser,
                    FullName = ee.Users.FullName,
                    Mail = ee.Users.Mail,
                    Phone = ee.Users.Phone,
                    IDCity = ee.IDCity,
                    City = ee.City.CityName,
                    Price = ee.Price,
                    DateBabysitter = ee.DateBabysitter,
                    YearsExperience = ee.YearsExperience,
                    TimeSlice1 = ee.TimeSlice1,
                    TimeSlice2 = ee.TimeSlice2,
                    TimeSlice3 = ee.TimeSlice3,
                    TimeSlice4 = ee.TimeSlice4,
                    Comments = ee.Comments
                }).ToList();
            return e;
        }
        public List<OfferBabysittersDTO> GetOfferBabysitterByDateAndCity(DateTime date,int idCity)
        {
            return m_db.Babysitters
                .Where(babysitter => babysitter.DateBabysitter == date 
                && babysitter.IDCity == idCity)
                .Select(ee =>    
                new OfferBabysittersDTO()
                {
                    IDBabysitter = ee.IDBabysitter,
                    IDUser = ee.IDUser,
                    FullName = ee.Users.FullName,
                    Mail = ee.Users.Mail,
                    Phone = ee.Users.Phone,
                    IDCity = ee.IDCity,
                    City = ee.City.CityName,
                    Price = ee.Price,
                    DateBabysitter = ee.DateBabysitter,
                    YearsExperience = ee.YearsExperience,
                    TimeSlice1 = ee.TimeSlice1,
                    TimeSlice2 = ee.TimeSlice2,
                    TimeSlice3 = ee.TimeSlice3,
                    TimeSlice4 = ee.TimeSlice4,
                    Comments = ee.Comments
                }).ToList();
        }
        public List<OfferBabysittersDTO> GetOfferBabysitterByUserID(int userID)
        {
            var e = m_db.Babysitters
                .Include(i => i.Users)
                .Where(bbsit => bbsit.IDUser == userID)
                .Select(ee =>
                new OfferBabysittersDTO()
                {
                    IDBabysitter = ee.IDBabysitter,
                    IDUser = ee.IDUser,
                    FullName = ee.Users.FullName,
                    Mail = ee.Users.Mail,
                    Phone = ee.Users.Phone,
                    City = ee.City.CityName,
                    IDCity=ee.IDCity,
                    DateBabysitter = ee.DateBabysitter,
                    YearsExperience = ee.YearsExperience,
                    Price = ee.Price,
                    TimeSlice1 = ee.TimeSlice1,
                    TimeSlice2 = ee.TimeSlice2,
                    TimeSlice3 = ee.TimeSlice3,
                    TimeSlice4 = ee.TimeSlice4,
                    Comments = ee.Comments
                }).ToList();
            return e;
        }
        public bool AddOfferBabysitter(OfferBabysittersDTO babysitter)
        {
            OfferBabysitters newBabysitter = new OfferBabysitters();
            newBabysitter.IDHelp = 2;
            newBabysitter.IDUser = babysitter.IDUser;
            newBabysitter.IDCity = babysitter.IDCity;
            newBabysitter.Price = babysitter.Price;
            newBabysitter.DateBabysitter = babysitter.DateBabysitter;
            newBabysitter.YearsExperience = babysitter.YearsExperience;
            newBabysitter.TimeSlice1 = babysitter.TimeSlice1;
            newBabysitter.TimeSlice2 = babysitter.TimeSlice2;
            newBabysitter.TimeSlice3 = babysitter.TimeSlice3;
            newBabysitter.TimeSlice4 = babysitter.TimeSlice4;
            newBabysitter.Comments = babysitter.Comments;
            m_db.Babysitters.Add(newBabysitter);
            int c = m_db.SaveChanges();
            return c > 0;
        }
        public OfferBabysitters getOfferBBsitForDelUp(int id)
        {
            return m_db.Babysitters
                .Where(bbsit => bbsit.IDBabysitter == id)
                .FirstOrDefault();
        }
        public ResponseDTO UpdateOfferBabysitter(int id, OfferBabysittersDTO babysitterToUpdate)
        {
            OfferBabysitters bbsitFromDB = getOfferBBsitForDelUp(id);
            if (bbsitFromDB == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Babysitter {bbsitFromDB.IDBabysitter} with id:{id} not found in the database."
                };
            }
            bbsitFromDB.IDCity = babysitterToUpdate.IDCity;
            bbsitFromDB.Price = babysitterToUpdate.Price;
            bbsitFromDB.DateBabysitter = babysitterToUpdate.DateBabysitter;
            bbsitFromDB.YearsExperience = babysitterToUpdate.YearsExperience;
            bbsitFromDB.TimeSlice1 = babysitterToUpdate.TimeSlice1;
            bbsitFromDB.TimeSlice2 = babysitterToUpdate.TimeSlice2;
            bbsitFromDB.TimeSlice3 = babysitterToUpdate.TimeSlice3;
            bbsitFromDB.TimeSlice4 = babysitterToUpdate.TimeSlice4;
            bbsitFromDB.Comments = babysitterToUpdate.Comments;
            m_db.Babysitters.Update(bbsitFromDB);
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
        public ResponseDTO DeleteOfferBbsit(int id)
        {
            OfferBabysitters bbsitToDelete = getOfferBBsitForDelUp(id);
            if (bbsitToDelete == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Entity with id:{id} not found in the database."
                };
            }
            m_db.Babysitters.Remove(bbsitToDelete);
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
