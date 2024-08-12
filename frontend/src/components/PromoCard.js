const PromoCard = ({ title, image }) => (
    <div className="relative">
      <img
        src={image}
        alt={title}
        className="w-full h-56 object-cover rounded-lg"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-end justify-start">
        <h3 className="text-white text-lg font-semibold m-2">{title}</h3>
      </div>
    </div>
  );

  export default PromoCard