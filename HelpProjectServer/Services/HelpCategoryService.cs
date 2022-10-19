using HelpProjectServer.Data;
using HelpProjectServer.Data.DTO;
using HelpProjectServer.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HelpProjectServer.Services
{
    public class HelpCategoryService
    {
        private readonly HelpDBContext m_db;
        public HelpCategoryService(HelpDBContext db)
        {
            m_db = db;
        }
        public List<HelpCategory> GetHelpCategories()
        {
            return m_db.HelpCategory.ToList();
        }
        public HelpCategory GetHelpCategory(int id)
        {
            return m_db.HelpCategory
                .Where(helpCategory => helpCategory.IDHelp == id)
                .FirstOrDefault();
        }
        public bool AddCategory(HelpCategoryDTO myCategory)
        {
            HelpCategory newHelpCategory = new HelpCategory();
            newHelpCategory.NameHelp = myCategory.NameHelp;
            m_db.HelpCategory.Add(newHelpCategory);
            int c = m_db.SaveChanges();
            return c > 0;
        }
    }
}
