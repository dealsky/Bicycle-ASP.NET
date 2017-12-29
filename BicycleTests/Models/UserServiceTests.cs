using Microsoft.VisualStudio.TestTools.UnitTesting;
using Bicycle.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bicycle.Models.Tests
{
    [TestClass()]
    public class UserServiceTests
    {
        [TestMethod()]
        public void getUserByAccTest()
        {
            module_user user = UserService.getUserByAcc("100000");
            Assert.Fail();
        }
    }
}