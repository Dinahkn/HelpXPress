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
    public class OfferTeachersService
    {
        private readonly HelpDBContext m_db;
        public OfferTeachersService(HelpDBContext db)
        {
            m_db = db;
        }
        public List<OfferTeachersDTO> GetAllOfferTeachers()
        {
            var e = m_db.OfferTeachers
                .Include(i => i.Users)
                .Select(ee =>
                new OfferTeachersDTO()
                {
                    IDTeacher = ee.IDTeacher,
                    IDUser = ee.IDUser,
                    IDCity=ee.IDCity,
                    FullName = ee.Users.FullName,
                    Mail = ee.Users.Mail,
                    Phone = ee.Users.Phone,
                    City = ee.City.CityName,
                    DatePossible = ee.DatePossible,
                    YearsExperience = ee.YearsExperience,
                    Price = ee.Price,
                    TimeSlice1 =ee.TimeSlice1,
                    TimeSlice2 = ee.TimeSlice2,
                    TimeSlice3 = ee.TimeSlice3,
                    TimeSlice4 = ee.TimeSlice4,
                    IDSubject=ee.IDSubject,
                    Subject = ee.SubjectSchool.NameSubject,
                    IDLevel=ee.IDLevel,
                    Level = ee.Level.NameLevel,
                    Comments =ee.Comments
                }).ToList();
            return e;
        }
        public OfferTeachersDTO GetOfferTeacher(int id)
        {
            return m_db.OfferTeachers
                .Where(offerTeach => offerTeach.IDTeacher == id)
                .Include(i => i.Users)
                .Select(ee =>
                new OfferTeachersDTO()
                {
                    IDTeacher = ee.IDTeacher,
                    IDUser = ee.IDUser,
                    FullName = ee.Users.FullName,
                    Mail = ee.Users.Mail,
                    Phone = ee.Users.Phone,
                    IDCity=ee.IDCity,
                    City = ee.City.CityName,
                    DatePossible = ee.DatePossible,
                    YearsExperience = ee.YearsExperience,
                    Price = ee.Price,
                    TimeSlice1 = ee.TimeSlice1,
                    TimeSlice2 = ee.TimeSlice2,
                    TimeSlice3 = ee.TimeSlice3,
                    TimeSlice4 = ee.TimeSlice4,
                    IDSubject = ee.IDSubject,
                    Subject = ee.SubjectSchool.NameSubject,
                    IDLevel = ee.IDLevel,
                    Level = ee.Level.NameLevel,
                    Comments = ee.Comments
                }).FirstOrDefault();
        }
        public List<OfferTeachersDTO> GetOfferTeachersByUserID(int userID)
        {
            var e = m_db.OfferTeachers
                .Include(i => i.Users)
                .Where(teacher => teacher.IDUser == userID)
                .Select(ee =>
                new OfferTeachersDTO()
                {
                    IDTeacher = ee.IDTeacher,
                    IDUser = ee.IDUser,
                    FullName = ee.Users.FullName,
                    Mail = ee.Users.Mail,
                    Phone = ee.Users.Phone,
                    IDCity=ee.IDCity,
                    City = ee.City.CityName,
                    DatePossible = ee.DatePossible,
                    YearsExperience = ee.YearsExperience,
                    Price = ee.Price,
                    TimeSlice1 = ee.TimeSlice1,
                    TimeSlice2 = ee.TimeSlice2,
                    TimeSlice3 = ee.TimeSlice3,
                    TimeSlice4 = ee.TimeSlice4,
                    IDSubject = ee.IDSubject,
                    Subject = ee.SubjectSchool.NameSubject,
                    IDLevel = ee.IDLevel,
                    Level = ee.Level.NameLevel,
                    Comments = ee.Comments
                }).ToList();
            return e;
        }
        public List<OfferTeachersDTO> GetOfferTeachersCity(int idCity)
        {
            var e = m_db.OfferTeachers
                .Include(i => i.Users)
                .Where(teacher => teacher.IDCity == idCity)
                .Select(ee =>
                new OfferTeachersDTO()
                {
                    IDTeacher = ee.IDTeacher,
                    IDUser = ee.IDUser,
                    FullName = ee.Users.FullName,
                    Mail = ee.Users.Mail,
                    Phone = ee.Users.Phone,
                    IDCity=ee.IDCity,
                    City = ee.City.CityName,
                    DatePossible = ee.DatePossible,
                    YearsExperience = ee.YearsExperience,
                    Price = ee.Price,
                    TimeSlice1 = ee.TimeSlice1,
                    TimeSlice2 = ee.TimeSlice2,
                    TimeSlice3 = ee.TimeSlice3,
                    TimeSlice4 = ee.TimeSlice4,
                    IDSubject = ee.IDSubject,
                    Subject = ee.SubjectSchool.NameSubject,
                    IDLevel = ee.IDLevel,
                    Level = ee.Level.NameLevel,
                    Comments = ee.Comments
                }).ToList();
            return e;
        }
        public List<OfferTeachersDTO> GetOfferTeachersLevel(int idLevel)
        {
            var e = m_db.OfferTeachers
                .Include(i => i.Users)
                .Where(teacher => teacher.IDLevel == idLevel)
                .Select(ee =>
                new OfferTeachersDTO()
                {
                    IDTeacher = ee.IDTeacher,
                    IDUser = ee.IDUser,
                    FullName = ee.Users.FullName,
                    Mail = ee.Users.Mail,
                    Phone = ee.Users.Phone,
                    IDCity = ee.IDCity,
                    City = ee.City.CityName,
                    DatePossible = ee.DatePossible,
                    YearsExperience = ee.YearsExperience,
                    Price = ee.Price,
                    TimeSlice1 = ee.TimeSlice1,
                    TimeSlice2 = ee.TimeSlice2,
                    TimeSlice3 = ee.TimeSlice3,
                    TimeSlice4 = ee.TimeSlice4,
                    IDSubject = ee.IDSubject,
                    Subject = ee.SubjectSchool.NameSubject,
                    IDLevel = ee.IDLevel,
                    Level = ee.Level.NameLevel,
                    Comments = ee.Comments
                }).ToList();
            return e;
        }
        public List<OfferTeachersDTO> GetOfferTeacherSubject(int idSubject)
        {
            var e = m_db.OfferTeachers
                .Include(i => i.Users)
                .Where(teacher => teacher.IDSubject == idSubject)
                .Select(ee =>
                new OfferTeachersDTO()
                {
                    IDTeacher = ee.IDTeacher,
                    IDUser = ee.IDUser,
                    FullName = ee.Users.FullName,
                    Mail = ee.Users.Mail,
                    Phone = ee.Users.Phone,
                    IDCity = ee.IDCity,
                    City = ee.City.CityName,
                    DatePossible = ee.DatePossible,
                    YearsExperience = ee.YearsExperience,
                    Price = ee.Price,
                    TimeSlice1 = ee.TimeSlice1,
                    TimeSlice2 = ee.TimeSlice2,
                    TimeSlice3 = ee.TimeSlice3,
                    TimeSlice4 = ee.TimeSlice4,
                    IDSubject = ee.IDSubject,
                    Subject = ee.SubjectSchool.NameSubject,
                    IDLevel = ee.IDLevel,
                    Level = ee.Level.NameLevel,
                    Comments = ee.Comments
                }).ToList();
            return e;
        }
        public List<OfferTeachersDTO> GetOfferTeacherSubjectCity(int idCity, int idSubject)
        {
            var e = m_db.OfferTeachers
                .Include(i => i.Users)
                .Where(teacher => teacher.IDCity == idCity && teacher.IDSubject == idSubject)
                .Select(ee =>
                new OfferTeachersDTO()
                {
                    IDTeacher = ee.IDTeacher,
                    IDUser = ee.IDUser,
                    FullName = ee.Users.FullName,
                    Mail = ee.Users.Mail,
                    Phone = ee.Users.Phone,
                    IDCity = ee.IDCity,
                    City = ee.City.CityName,
                    DatePossible = ee.DatePossible,
                    YearsExperience = ee.YearsExperience,
                    Price = ee.Price,
                    TimeSlice1 = ee.TimeSlice1,
                    TimeSlice2 = ee.TimeSlice2,
                    TimeSlice3 = ee.TimeSlice3,
                    TimeSlice4 = ee.TimeSlice4,
                    IDSubject = ee.IDSubject,
                    Subject = ee.SubjectSchool.NameSubject,
                    IDLevel = ee.IDLevel,
                    Level = ee.Level.NameLevel,
                    Comments = ee.Comments
                }).ToList();
            return e;
        }
        public List<OfferTeachersDTO> GetOfferTeacherCityLevel(int idCity, int idLevel)
        {
            var e = m_db.OfferTeachers
                .Include(i => i.Users)
                .Where(teacher => teacher.IDCity == idCity
                && teacher.IDLevel == idLevel)
                .Select(ee =>
                new OfferTeachersDTO()
                {
                    IDTeacher = ee.IDTeacher,
                    IDUser = ee.IDUser,
                    FullName = ee.Users.FullName,
                    Mail = ee.Users.Mail,
                    Phone = ee.Users.Phone,
                    IDCity = ee.IDCity,
                    City = ee.City.CityName,
                    DatePossible = ee.DatePossible,
                    YearsExperience = ee.YearsExperience,
                    Price = ee.Price,
                    TimeSlice1 = ee.TimeSlice1,
                    TimeSlice2 = ee.TimeSlice2,
                    TimeSlice3 = ee.TimeSlice3,
                    TimeSlice4 = ee.TimeSlice4,
                    IDSubject = ee.IDSubject,
                    Subject = ee.SubjectSchool.NameSubject,
                    IDLevel = ee.IDLevel,
                    Level = ee.Level.NameLevel,
                    Comments = ee.Comments
                }).ToList();
            return e;
        }
        public List<OfferTeachersDTO> GetOfferTeacherSubjectLevel(int idSubject, int idLevel)
        {
            var e = m_db.OfferTeachers
                .Include(i => i.Users)
                .Where(teacher => teacher.IDSubject == idSubject 
                && teacher.IDLevel==idLevel)
                .Select(ee =>
                new OfferTeachersDTO()
                {
                    IDTeacher = ee.IDTeacher,
                    IDUser = ee.IDUser,
                    FullName = ee.Users.FullName,
                    Mail = ee.Users.Mail,
                    Phone = ee.Users.Phone,
                    IDCity = ee.IDCity,
                    City = ee.City.CityName,
                    DatePossible = ee.DatePossible,
                    YearsExperience = ee.YearsExperience,
                    Price = ee.Price,
                    TimeSlice1 = ee.TimeSlice1,
                    TimeSlice2 = ee.TimeSlice2,
                    TimeSlice3 = ee.TimeSlice3,
                    TimeSlice4 = ee.TimeSlice4,
                    IDSubject = ee.IDSubject,
                    Subject = ee.SubjectSchool.NameSubject,
                    IDLevel = ee.IDLevel,
                    Level = ee.Level.NameLevel,
                    Comments = ee.Comments
                }).ToList();
            return e;
        }
        public List<OfferTeachersDTO> GetOfferTeacherSubjectCityLevel(int idCity, int idSubject,int idLevel)
        {
            var e = m_db.OfferTeachers
                .Include(i => i.Users)
                .Where(teacher => teacher.IDCity == idCity 
                && teacher.IDSubject == idSubject 
                && teacher.IDLevel == idLevel)
                .Select(ee =>
                new OfferTeachersDTO()
                {
                    IDTeacher = ee.IDTeacher,
                    IDUser = ee.IDUser,
                    FullName = ee.Users.FullName,
                    Mail = ee.Users.Mail,
                    Phone = ee.Users.Phone,
                    IDCity = ee.IDCity,
                    City = ee.City.CityName,
                    DatePossible = ee.DatePossible,
                    YearsExperience = ee.YearsExperience,
                    Price = ee.Price,
                    TimeSlice1 = ee.TimeSlice1,
                    TimeSlice2 = ee.TimeSlice2,
                    TimeSlice3 = ee.TimeSlice3,
                    TimeSlice4 = ee.TimeSlice4,
                    IDSubject = ee.IDSubject,
                    Subject = ee.SubjectSchool.NameSubject,
                    IDLevel = ee.IDLevel,
                    Level = ee.Level.NameLevel,
                    Comments = ee.Comments
                }).ToList();
            return e;
        }
        public bool AddOfferTeacher(OfferTeachersDTO teacher)
        {
            OfferTeachers newTeacher = new OfferTeachers();
            newTeacher.IDHelp = 1;
            newTeacher.IDUser = teacher.IDUser;
            newTeacher.IDCity = teacher.IDCity;
            newTeacher.DatePossible = teacher.DatePossible;
            newTeacher.YearsExperience = teacher.YearsExperience;
            newTeacher.Price = teacher.Price;
            newTeacher.TimeSlice1 = teacher.TimeSlice1;
            newTeacher.TimeSlice2 = teacher.TimeSlice2;
            newTeacher.TimeSlice3 = teacher.TimeSlice3;
            newTeacher.TimeSlice4 = teacher.TimeSlice4;
            newTeacher.IDSubject = teacher.IDSubject;
            newTeacher.IDLevel = teacher.IDLevel;
            newTeacher.Comments = teacher.Comments;     
            m_db.OfferTeachers.Add(newTeacher);
            int c = m_db.SaveChanges();
            return c > 0;
        }
        public OfferTeachers getOfferTeacherForDelUpd(int id)
        {
            return m_db.OfferTeachers
                .Where(teacher => teacher.IDTeacher == id)
                .FirstOrDefault();
        }
        public ResponseDTO UpdateOfferTeacher(int id, OfferTeachersDTO teacherToUpdate)
        {
            OfferTeachers teacherFromDB = getOfferTeacherForDelUpd(id);
            if (teacherFromDB == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Teacher {teacherFromDB.IDTeacher} with id:{id} not found in the database."
                };
            }
            teacherFromDB.IDCity = teacherToUpdate.IDCity;
            teacherFromDB.DatePossible = teacherToUpdate.DatePossible;
            teacherFromDB.YearsExperience = teacherToUpdate.YearsExperience;
            teacherFromDB.Price = teacherToUpdate.Price;
            teacherFromDB.TimeSlice1 = teacherToUpdate.TimeSlice1;
            teacherFromDB.TimeSlice2 = teacherToUpdate.TimeSlice2;
            teacherFromDB.TimeSlice3 = teacherToUpdate.TimeSlice3;
            teacherFromDB.TimeSlice4 = teacherToUpdate.TimeSlice4;
            teacherFromDB.IDSubject = teacherToUpdate.IDSubject;
            teacherFromDB.IDLevel = teacherToUpdate.IDLevel;
            teacherFromDB.Comments = teacherToUpdate.Comments;
            m_db.OfferTeachers.Update(teacherFromDB);
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
        public ResponseDTO DeleteOfferTeacher(int id)
        {
            OfferTeachers offerTeacherToDelete = getOfferTeacherForDelUpd(id);
            if (offerTeacherToDelete == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Entity with id:{id} not found in the database."
                };
            }
            m_db.OfferTeachers.Remove(offerTeacherToDelete);
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
