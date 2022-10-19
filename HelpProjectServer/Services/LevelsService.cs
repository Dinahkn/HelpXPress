
using HelpProjectServer.Data;
using HelpProjectServer.Data.DTO;
using HelpProjectServer.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HelpProjectServer.Services
{
    public class LevelsService
    {
        private readonly HelpDBContext m_db;
        public LevelsService(HelpDBContext db)
        {
            m_db = db;
        }
        public List<Levels> GetLevels()
        {
            return m_db.Levels.ToList();
        }
        public Levels GetLevel(int id)
        {
            return m_db.Levels
                .Where(level => level.IDLevel == id)
                .FirstOrDefault();
        }
        public bool AddLevel(LevelsDTO myLevel)
        {
            if (!levelExist(myLevel.NameLevel))
            {
                Levels newLevels = new Levels();
                newLevels.NameLevel = myLevel.NameLevel;
                m_db.Levels.Add(newLevels);
                int c = m_db.SaveChanges();
                return c > 0;
            }
            return false;
        }
        protected bool levelExist(string level)
        {
            return m_db.Levels.Any(l => l.NameLevel == level);
        }
        public ResponseDTO UpdateLevel(int id, LevelsDTO levelToUpdate)
        {
            Levels levelFromDB = GetLevel(id);
            if (levelFromDB == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Level {levelToUpdate.NameLevel} with id:{id} not found in the database."
                };
            }
            levelFromDB.NameLevel = levelToUpdate.NameLevel;
            m_db.Levels.Update(levelFromDB);
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
        public ResponseDTO DeleteLevel(int id)
        {
            Levels levelToDelete = GetLevel(id);
            if (levelToDelete == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"Entity with id:{id} not found in the database."
                };
            }
            m_db.Levels.Remove(levelToDelete);
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
