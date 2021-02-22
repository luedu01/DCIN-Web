using System;
using System.Web.Mvc;
using System.Configuration;
using System.Text;

namespace WebAppAgregacionNumerales.Controllers
{
    public class HomeController : Controller
    {
        private static string strUsr = "";
        private static readonly string fronEnd = ConfigurationManager.AppSettings["fronEnd"].ToString();
        private static readonly string[] strURLArray = new string[1] { fronEnd };

        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        [HttpPost]
        public ActionResult Login(FormCollection collection)
        {
            string redirect = Request[fronEnd];
            int strDest = Convert.ToInt32(redirect);
            string strFinalURL;
            if ((strDest >= 0) && (strDest <= strURLArray.Length - 1))
            {
                strFinalURL = strURLArray[strDest];

                try
                {

                    strUsr = collection["usuario"];
                    StringBuilder userhide = new StringBuilder(strUsr);
                    var count = strUsr.Length;
                    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                    var l = 1;
                    for (int i = 0; i < strUsr.Length; i++)
                    {
                        userhide.Insert(l, chars[Utils.RandomToken.Next(chars.Length)]);
                        l += 2;
                    }

                    return Redirect(strFinalURL + userhide.ToString());
                }
                catch (NullReferenceException)
                {
                    return Redirect(strFinalURL);
                }
                catch (FormatException)
                {
                    return Redirect(strFinalURL);
                }
                catch (IndexOutOfRangeException)
                {
                    return Redirect(strFinalURL);
                }
            }
            else
            {
                strFinalURL = strURLArray[0];
                return Redirect(strFinalURL);
            }
        }
    }
}
