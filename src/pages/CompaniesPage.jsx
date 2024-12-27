import { useEffect, useState } from "react";
import CompanyCard from "../components/utils/CompanyCard";
import axios from "axios";
import { apiBaseUrl } from "../components/api/settings";
import Loader from "../components/utils/Loader";

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/admin/companies-information`
        );
        setCompanies(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch Companies Information", error);
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full">
        <Loader />;
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-6">
        {companies.map((company) => (
          <CompanyCard key={company.companyId} company={company} />
        ))}
      </div>
    </div>
  );
};

export default CompaniesPage;
