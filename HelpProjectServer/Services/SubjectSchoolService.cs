
using HelpProjectServer.Data;
using HelpProjectServer.Data.DTO;
using HelpProjectServer.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HelpProjectServer.Services
{
    public class SubjectSchoolService
    {
        private readonly HelpDBContext m_db;
        public SubjectSchoolService(HelpDBContext db)
        {
            m_db = db;
        }
        public List<SubjectSchool> GetSubjects()
        {
            return m_db.SubjectSchool.ToList();
        }
        public SubjectSchool GetSubject(int id)
        {
            return m_db.SubjectSchool.Where(subject => subject.IDSubject == id).FirstOrDefault();
        }
        public bool AddSubject(SubjectSchoolDTO subj)
        {
            if (!subjectExist(subj.NameSubject))
            {
                SubjectSchool newSubj = new SubjectSchool();
                newSubj.NameSubject = subj.NameSubject;
                m_db.SubjectSchool.Add(newSubj);
                int c = m_db.SaveChanges();
                return c > 0;
            }
            return false;
        }
        protected bool subjectExist(string subject)
        {
            return m_db.SubjectSchool.Any(s=>s.NameSubject == subject);
        }
        public ResponseDTO UpdateSubject(int id, SubjectSchoolDTO subjectToUpdate)
        {
            SubjectSchool subjectFromDB = GetSubject(id);
            if (subjectFromDB == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Level {subjectToUpdate.NameSubject} with id:{id} not found in the database."
                };
            }
            subjectFromDB.NameSubject = subjectToUpdate.NameSubject;
            m_db.SubjectSchool.Update(subjectFromDB);
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
        public ResponseDTO DeleteSubject(int id)
        {
            SubjectSchool subjectToDelete = GetSubject(id);
            if (subjectToDelete == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Entity with id:{id} not found in the database."
                };
            }
            m_db.SubjectSchool.Remove(subjectToDelete);
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
