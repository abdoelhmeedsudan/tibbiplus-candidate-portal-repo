import { Building2, MapPin, SquareIcon as SquareAreaIcon, Banknote } from 'lucide-react';
import { motion } from 'framer-motion';

interface PropertyCardProps {
  id: string;
  title: string;
  type: 'sale' | 'rent';
  propertyType: string;
  location: string;
  area: string;
  price: string;
  imageUrl: string;
}

const PropertyCard = ({
  id,
  title,
  type,
  propertyType,
  location,
  area,
  price,
  imageUrl,
}: PropertyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200"
    >
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        <div 
          className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded ${
            type === 'sale' ? 'bg-amber-500 text-white' : 'bg-blue-500 text-white'
          }`}
        >
          {type === 'sale' ? 'للبيع' : 'للإيجار'}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <Building2 className="h-4 w-4 ml-2 text-gray-400" />
            <span className="text-sm">{propertyType}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 ml-2 text-gray-400" />
            <span className="text-sm">{location}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <SquareAreaIcon className="h-4 w-4 ml-2 text-gray-400" />
            <span className="text-sm">{area}</span>
          </div>
          
          <div className="flex items-center text-gray-700 font-medium">
            <Banknote className="h-4 w-4 ml-2 text-gray-400" />
            <span className="text-sm">{price}</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center">
          <a
            href={`/clinics/${id}`}
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-blue-600 rounded-md text-sm font-medium text-blue-600 bg-white hover:bg-blue-50"
          >
            عرض التفاصيل
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;