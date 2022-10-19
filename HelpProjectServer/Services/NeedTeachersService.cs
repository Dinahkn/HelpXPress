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
    public class NeedTeachersService
    {
        private readonly HelpDBContext m_db;
        public NeedTeachersService(HelpDBContext db)
        {
            m_db = db;
        }
        public List<NeedTeachersDTO> GetNeedTeachers()
        {
            var e = m_db.NeedTeachers
                .Include(i => i.Users)
                .Select(ee =>
              new NeedTeachersDTO()
              {
                  IDNeedTeacher=ee.IDNeedTeacher,
                  IDUser = ee.IDUser,
                  FullName = ee.Users.FullName,
                  Mail = ee.Users.Mail,
                  Phone = ee.Users.Phone,
                  IDCity = ee.IDCity,
                  City = ee.City.CityName,
                  DatePossible = ee.DatePossible,
                  TimeSlice1 = ee.TimeSlice1,
                  TimeSlice2 = ee.TimeSlice2,
                  TimeSlice3 = ee.TimeSlice3,
                  TimeSlice4 = ee.TimeSlice4,
                  IDSubject=ee.IDSubject,
                  Subject = ee.SubjectSchool.NameSubject,
                  IDLevel=ee.IDLevel,
                  Level = ee.Level.NameLevel,
                  Comments = ee.Comments
              }).ToList();
            return e;
        }
        public NeedTeachersDTO GetNeedTeacher(int id)
        {
            return m_db.NeedTeachers
                .Where(teacher => teacher.IDNeedTeacher == id)
                .Select(ee => new NeedTeachersDTO()
                {
                    IDNeedTeacher = ee.IDNeedTeacher,
                    IDUser = ee.IDUser,
                    FullName = ee.Users.FullName,
                    Mail = ee.Users.Mail,
                    Phone = ee.Users.Phone,
                    IDCity = ee.IDCity,
                    City = ee.City.CityName,
                    DatePossible = ee.DatePossible,
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
        public List<NeedTeachersDTO> GetNeedTeachersByUserID(int userID)
        {
            var e = m_db.NeedTeachers
                .Include(i => i.Users)
                .Where(teacher => teacher.IDUser == userID)
                .Select(ee =>
                new NeedTeachersDTO()
                {
                    IDNeedTeacher = ee.IDNeedTeacher,
                    IDUser = ee.IDUser,
                    FullName = ee.Users.FullName,
                    Mail = ee.Users.Mail,
                    Phone = ee.Users.Phone,
                    IDCity=ee.IDCity,
                    City = ee.City.CityName,
                    DatePossible = ee.DatePossible,
                    IDSubject = ee.IDSubject,
                    Subject = ee.SubjectSchool.NameSubject,
                    IDLevel = ee.IDLevel,
                    Level = ee.Level.NameLevel,
                    TimeSlice1 = ee.TimeSlice1,
                    TimeSlice2 = ee.TimeSlice2,
                    TimeSlice3 = ee.TimeSlice3,
                    TimeSlice4 = ee.TimeSlice4,
                    Comments = ee.Comments
                }).ToList();
            return e;
        }
        public bool AddNeedTeacher(NeedTeachersDTO teacher)
        {
            NeedTeachers newNeedTeacher = new NeedTeachers();
            newNeedTeacher.IDHelp = 1;
            newNeedTeacher.IDUser = teacher.IDUser;
            newNeedTeacher.IDCity = teacher.IDCity;
            newNeedTeacher.DatePossible = teacher.DatePossible;
            newNeedTeacher.TimeSlice1 = teacher.TimeSlice1;
            newNeedTeacher.TimeSlice2 = teacher.TimeSlice2;
            newNeedTeacher.TimeSlice3 = teacher.TimeSlice3;
            newNeedTeacher.TimeSlice4 = teacher.TimeSlice4;
            newNeedTeacher.IDSubject = teacher.IDSubject;
            newNeedTeacher.IDLevel = teacher.IDLevel;
            m_db.NeedTeachers.Add(newNeedTeacher);
            int c = m_db.SaveChanges();
            return c > 0;
        }
        public NeedTeachers getTeacherForDelUpd(int id)
        {
            return m_db.NeedTeachers
                .Where(teacher => teacher.IDNeedTeacher == id)
                .FirstOrDefault();
        }
        public ResponseDTO UpdateNeedTeacher(int id, NeedTeachersDTO needTeacherToUpdate)
        {
            NeedTeachers needTeacherFromDB = getTeacherForDelUpd(id);
            if (needTeacherFromDB == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Teacher {needTeacherFromDB.IDNeedTeacher} with id:{id} not found in the database."
                };
            }
            needTeacherFromDB.IDCity = needTeacherToUpdate.IDCity;
            needTeacherFromDB.DatePossible = needTeacherToUpdate.DatePossible;
            needTeacherFromDB.TimeSlice1 = needTeacherToUpdate.TimeSlice1;
            needTeacherFromDB.TimeSlice2 = needTeacherToUpdate.TimeSlice2;
            needTeacherFromDB.TimeSlice3 = needTeacherToUpdate.TimeSlice3;
            needTeacherFromDB.TimeSlice4 = needTeacherToUpdate.TimeSlice4;
            needTeacherFromDB.IDSubject = needTeacherToUpdate.IDSubject;
            needTeacherFromDB.IDLevel = needTeacherToUpdate.IDLevel;
            needTeacherFromDB.Comments = needTeacherToUpdate.Comments;
            m_db.NeedTeachers.Update(needTeacherFromDB);
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
        public ResponseDTO DeleteNeedTeacher(int id)
        {
            NeedTeachers needTeacherToDelete = getTeacherForDelUpd(id);
            if (needTeacherToDelete == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Entity with id:{id} not found in the database."
                };
            }
            m_db.NeedTeachers.Remove(needTeacherToDelete);
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
