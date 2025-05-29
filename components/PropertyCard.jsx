import Image from "next/image";
import Link from "next/link";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaMoneyBill,
} from "react-icons/fa";

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-xl shadow-md relative flex flex-col md:flex-row">
      <Image
        src={`/images/properties/${property.images[0]}`}
        alt={property.name}
        width="0"
        height="0"
        sizes="100vw"
        className="w-full h-auto rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5"
      />
      <div className="p-6 mx-auto md:w-3/5">
        <h3 className="text-xl font-bold">{property.name}</h3>
        <div className="text-gray-600 mb-4">{property.type}</div>
        <h3 className="absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          {property.rates?.monthly
            ? `$${property.rates.monthly}/mo`
            : property.rates?.weekly
            ? `$${property.rates.weekly}/wk`
            : property.rates?.nightly
            ? `$${property.rates.nightly}/night`
            : "Contact for rates"}
        </h3>
        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className="md:hidden lg:inline" /> {property.beds}{" "}
            <span className="md:hidden lg:inline">Beds</span>
          </p>
          <p>
            <FaBath className="md:hidden lg:inline" /> {property.baths}{" "}
            <span className="md:hidden lg:inline">Baths</span>
          </p>
          <p>
            <FaRulerCombined className="md:hidden lg:inline" />
            {property.square_feet.toLocaleString()}{" "}
            <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          {property.rates?.nightly && (
            <p>
              <FaMoneyBill className="md:hidden lg:inline" /> Nightly
            </p>
          )}
          {property.rates?.weekly && (
            <p>
              <FaMoneyBill className="md:hidden lg:inline" /> Weekly
            </p>
          )}
          {property.rates?.monthly && (
            <p>
              <FaMoneyBill className="md:hidden lg:inline" /> Monthly
            </p>
          )}
        </div>

        <div className="border border-gray-200 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarkerAlt className="text-lg text-orange-700" />
            <span className="text-orange-700">
              {" "}
              {property.location.city}, {property.location.state}{" "}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
