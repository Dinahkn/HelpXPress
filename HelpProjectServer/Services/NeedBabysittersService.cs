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
    public class NeedBabysittersService
    {
        private readonly HelpDBContext m_db;
        public NeedBabysittersService(HelpDBContext db)
        {
            m_db = db;
        }
        public List<NeedBabysittersDTO> GetNeedBabysitters()
        {
            var e = m_db.NeedBabysitters
                .Include(i => i.Users)
                .Select(ee =>
                new NeedBabysittersDTO()
                {
                    IDNeedBabysitter = ee.IDNeedBabysitter,
                    IDUser = ee.IDUser,
                    IDCity = ee.IDCity,
                    FullName = ee.Users.FullName,
                    Mail = ee.Users.Mail,
                    Phone = ee.Users.Phone,
                    City = ee.City.CityName,
                    DateBabysitter = ee.DateBabysitter,
                    TimeSlice1 = ee.TimeSlice1,
                    TimeSlice2 = ee.TimeSlice2,
                    TimeSlice3 = ee.TimeSlice3,
                    TimeSlice4 = ee.TimeSlice4,
                    Comments = ee.Comments
                }).ToList();
            return e;
        }
        public NeedBabysittersDTO GetNeedBabysitter(int id)
        {
            return m_db.NeedBabysitters
                .Where(babysitter => babysitter.IDNeedBabysitter == id)
                .Select(ee => 
                new NeedBabysittersDTO()
                {
                    IDNeedBabysitter = ee.IDNeedBabysitter,
                    IDUser = ee.IDUser,
                    IDCity = ee.IDCity,
                    FullName = ee.Users.FullName,
                    Mail = ee.Users.Mail,
                    Phone = ee.Users.Phone,
                    City = ee.City.CityName,
                    DateBabysitter = ee.DateBabysitter,
                    TimeSlice1 = ee.TimeSlice1,
                    TimeSlice2 = ee.TimeSlice2,
                    TimeSlice3 = ee.TimeSlice3,
                    TimeSlice4 = ee.TimeSlice4,
                    Comments = ee.Comments
                }).FirstOrDefault();
        }
        public List<NeedBabysittersDTO> GetNeedBabysitterByUserID(int userID)
        {
            var e=m_db.NeedBabysitters
                .Include(i=>i.Users)
                .Where(bbsit=>bbsit.IDUser==userID)
                .Select(ee =>
                new NeedBabysittersDTO()
                {
                    IDNeedBabysitter = ee.IDNeedBabysitter,
                    IDUser = ee.IDUser,
                    FullName = ee.Users.FullName,
                    Mail = ee.Users.Mail,
                    Phone = ee.Users.Phone,
                    IDCity = ee.IDCity,
                    City = ee.City.CityName,
                    DateBabysitter = ee.DateBabysitter,
                    TimeSlice1 = ee.TimeSlice1,
                    TimeSlice2 = ee.TimeSlice2,
                    TimeSlice3 = ee.TimeSlice3,
                    TimeSlice4 = ee.TimeSlice4,
                    Comments = ee.Comments
                }).ToList();
            return e;
        }
        public bool AddNeedBabysitter(NeedBabysittersDTO needBabysitter)
        {
            NeedBabysitters newNeedBabysitter = new NeedBabysitters();
            newNeedBabysitter.IDHelp = 2;
            newNeedBabysitter.IDUser = needBabysitter.IDUser;
            newNeedBabysitter.IDCity = needBabysitter.IDCity;
            newNeedBabysitter.DateBabysitter = needBabysitter.DateBabysitter;
            newNeedBabysitter.TimeSlice1 = needBabysitter.TimeSlice1;
            newNeedBabysitter.TimeSlice2 = needBabysitter.TimeSlice2;
            newNeedBabysitter.TimeSlice3 = needBabysitter.TimeSlice3;
            newNeedBabysitter.TimeSlice4 = needBabysitter.TimeSlice4;
            newNeedBabysitter.Comments = needBabysitter.Comments;
            m_db.NeedBabysitters.Add(newNeedBabysitter);
            int c = m_db.SaveChanges();
            return c > 0;
        }
        public NeedBabysitters getNeedBBsitForDelUp(int id)
        {
            return m_db.NeedBabysitters
                .Where(bbsit => bbsit.IDNeedBabysitter == id)
                .FirstOrDefault();
        }
        public ResponseDTO UpdateNeedBabysitter(int id, NeedBabysittersDTO babysitterToUpdate)
        {
            NeedBabysitters needBbsitFromDB = getNeedBBsitForDelUp(id);
            if (needBbsitFromDB == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Babysitter {needBbsitFromDB.IDNeedBabysitter} with id:{id} not found in the database."
                };
            }
            needBbsitFromDB.IDCity = babysitterToUpdate.IDCity;
            needBbsitFromDB.DateBabysitter = babysitterToUpdate.DateBabysitter;
            needBbsitFromDB.TimeSlice1 = babysitterToUpdate.TimeSlice1;
            needBbsitFromDB.TimeSlice2 = babysitterToUpdate.TimeSlice2;
            needBbsitFromDB.TimeSlice3 = babysitterToUpdate.TimeSlice3;
            needBbsitFromDB.TimeSlice4 = babysitterToUpdate.TimeSlice4;
            needBbsitFromDB.Comments = babysitterToUpdate.Comments;
            m_db.NeedBabysitters.Update(needBbsitFromDB);
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
        public ResponseDTO DeleteNeedBbsit(int id)
        {
            NeedBabysitters needBbsitToDelete = getNeedBBsitForDelUp(id);
            if (needBbsitToDelete == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Entity with id:{id} not found in the database."
                };
            }
            m_db.NeedBabysitters.Remove(needBbsitToDelete);
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
