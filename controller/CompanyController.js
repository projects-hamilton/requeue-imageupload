// driver_id: user._id,

const Company_Profiles = require("../models/company");

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
    let Search = Storedata(
      ["Company_Name", "Company_Address", "company_email"],
      req.body
    );
    if (Search[0] == false)
      return res
        .status(400)
        .json({ message: `${Search[1]} Field Required`, data: [] });
    const { Company_Name, Company_Address, company_email } = req.body;
    const GetCompanyDetails = await Company_Profiles.create({
      Company_Address,
      Company_Name,
      company_email,
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

//DeleteCompanyDetailsByid
const DeleteCompanyDetailsById = async (req, res) => {
  try {
    const GetDetails = await Company_Profiles.findOneAndDelete({
      _id: req.params.id,
    });
    if (!GetDetails) {
      res.status(403).json({ message: "Enter the correct id", status: false });
    } else {
      res.send({
        message: "Successfully Deleted",
        status: true,
      });
    }
  } catch (error) {
    res.send({ message: error.message, status: false });
  }
};


//PatchDetails
const UpdatedCompanyDetails = async (req, res) => {
  try {
    let Search = Storedata(["Company_Name", "Company_Address", "company_email"], req.body);
    if (Search[0] == false)
      return res
        .status(400)
        .json({ message: `${Search[1]} Field Required`, data: [] });
    const { Company_Name, Company_Address, company_email} = req.body;
    const UpdateedAmount = await Company_Profiles.findOneAndUpdate(
      { _id: req.params.id },
      {Company_Name, Company_Address, company_email }
    );
    res.status(200).json({
      message: "Update Company Details  Successfully",
      data: UpdateedAmount,
      status: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

const GetAllComapnyDetails = async (req, res) => {
  try {
    const GetAreaDetais = await Company_Profiles.find();
    res
      .status(200)
      .json({ message: "SuccessFully-", status: true, data: GetAreaDetais });
  } catch (error) {
    res.send({ message: error.message, status: false });
  }
};


const GetByCompanyId = async (req, res) => {
  try {
    // const driver_id = req.params.id;
    let getResponce = await Company_Profiles.find({ _id:req.params.id});
    res
      .status(200)
      .json({ message: "Company Details",Responce: getResponce});
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};


module.exports = {
  CompanyProfilesPost,
  DeleteCompanyDetailsById,
  UpdatedCompanyDetails,
  GetAllComapnyDetails,
  GetByCompanyId
};
