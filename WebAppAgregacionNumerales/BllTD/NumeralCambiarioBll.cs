using BIDAL;
using EntitiesTD;
using System.Collections.Generic;

namespace BllTD
{
   public class NumeralCambiarioBll
    {
        NumeralCambiarioDAL numeralCambiarioSAFDAL;

        public NumeralCambiarioBll()
        {
            numeralCambiarioSAFDAL = new NumeralCambiarioDAL();
        }

        public List<NumeralCambiario> Get_NumeralCambiarioBll()
        {
            return numeralCambiarioSAFDAL.Get_NumeralCambiarioDAL();
        }
    }
}
