// driver_id: user._id,

const Company_Profiles = require('../models/company')



const Storedata = (search, data) => {
  for (let i = 0; i < search.length; i++) {
    if (
      data[search[i]] == "" ||
      data[search[i]] == undefined ||
      data[search[i]] == null
    ) {
      return [false, search[i]];
    }
  }
  return [true, ""];
};


const CompanyProfilesPost = async (req, res) => {
    try {
      let Search = Storedata(["Company_Name", "Company_Address","company_email"], req.body);
      if (Search[0] == false)
        return res
          .status(400)
          .json({ message: `${Search[1]} Field Required`, data: [] });
      const {Company_Name,Company_Address,company_email } = req.body;
      const GetCompanyDetails = await Company_Profiles.create({ Company_Address,Company_Name,company_email,
        Company_id:user_id


     });
      res.status(200).json({
        message: "Company Details successfully",
        data: GetCompanyDetails,
        status: true,
      });
    } catch (error) {
      res.status(400).json({ message: error.message, status: false });
    }
  };


  module.export = {
    CompanyProfilesPost


  }
  