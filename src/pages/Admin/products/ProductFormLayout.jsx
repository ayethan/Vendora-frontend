import React from 'react';
import { CloudDownload } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FiBookOpen, FiCpu, FiSmile, FiHeart, FiCoffee, FiArchive, FiAward, FiPlusSquare, FiShoppingBag} from 'react-icons/fi';
import DisplayImage from './DisplayImage';
import { Controller } from 'react-hook-form';

const categoriesData = [
    {id: 1, name: 'Electronics', icon: <FiCpu /> }, {id: 2, name: 'Fashion', icon: <FiShoppingBag /> },
    {id: 3,name: 'Books', icon: <FiBookOpen /> },
    {id: 4,name: 'Toys', icon: <FiSmile /> }, {id: 5,name: 'Sports', icon: <FiAward /> },
    {id: 6,name: 'Beauty', icon: <FiHeart /> }, {id: 7, name: 'Health', icon: <FiPlusSquare /> },
    {id: 8,name: 'Food', icon: <FiCoffee /> }, {id: 9, name: 'Furniture', icon: <FiArchive /> },
];

function ProductFormLayout({
  product,
  onClose,
  handleSubmit,
  onFormSubmit,
  register,
  errors,
  control,
  // setValue,
  // watch,
  handleFeaturedImageUpload,
  handleUploadProduct,
  isUploadingFeaturedImage,
  isSaveButtonDisabled,
  productImages,
  setOpenFullScreenImage,
  setFullScreenImage,
  openFullScreenImage,
  fullScreenImage
}) {
  return (
        <div key={product? product._id: ''} className='fixed w-full  h-full bg-gray-900/50 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center overflow-y-autofixed inset-0 bg-gray-900/50 z-50 flex items-start sm:items-center justify-center p-4 sm:p-6 overflow-y-auto'
        aria-modal="true" role="dialog" tabIndex="-1">

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-lg sm:max-w-2xl mx-auto my-8 sm:my-0 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{product._id ? 'Edit Product' : 'Create Product'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black font-semibold bg-gray-100 py-1 px-3 rounded cursor-pointer">&times;</button>
        </div>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="space-y-4">
            {/* Form fields remain the same */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" id="name" {...register("name", { required: "Product name is required" })} className={`mt-1 p-2 border rounded-md w-full ${errors.name ? 'border-gray-500' : 'border-gray-200'}`} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
              <select id="brand" {...register("brand", { required: "Brand is required" })} className={`mt-1 p-2 border rounded-md w-full ${errors.brand ? 'border-gray-500' : 'border-gray-200'}`}>
                <option value="">Select brand</option>
                <option value="1">brand 1</option>
                <option value="2">brand 2</option>
              </select>
              {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand.message}</p>}
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <select id="category" {...register("category", { required: "Category is required" })} className={`mt-1 p-2 border rounded-md w-full ${errors.category ? 'border-gray-500' : 'border-gray-200'}`}>
                <option value="">Select Category</option>
                {categoriesData.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <select id="isActive" {...register("isActive",  { required: "Status is required" })} className={`mt-1 p-2 border rounded-md w-full ${errors.isActive ? 'border-gray-500' : 'border-gray-200'}`}>
                <option value="">Select Status</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
              {errors.isActive && <p className="text-red-500 text-xs mt-1">{errors.isActive.message}</p>}
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <ReactQuill
                            theme="snow"
                            value={field.value|| ''}
                            onChange={field.onChange}
                            className={`mt-1 border-gray-300 rounded ${errors.description ? 'border-gray-500' : 'border-gray-200'}`}
                        />
                    )}
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
              <input type="number" id="price" {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                  min: { value: 0.01, message: "Price must be greater than 0" }
                })} className={`mt-1 p-2 border rounded-md w-full ${errors.price ? 'border-gray-500' : 'border-gray-200'}`} />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
            </div>
            <div>
              <label htmlFor="selling_price" className="block text-sm font-medium text-gray-700">Selling Price</label>
              <input type="number" id="selling_price" {...register("selling_price", { valueAsNumber: true })} className="mt-1 p-2 border border-gray-200 rounded-md w-full" />
            </div>
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
              <input type="number" id="stock" {...register("stock", {
                  required: "Stock is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Stock cannot be negative" },
                  validate: value => Number.isInteger(value) || "Stock must be a whole number"
                })} className={`mt-1 p-2 border rounded-md w-full ${errors.stock ? 'border-gray-500' : 'border-gray-200'}`} />
              {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>}
            </div>
            <div>
              <label htmlFor="featured_image" className="block text-sm font-medium text-gray-700">Featured Image</label>
              <input type="file" id="featured_image"
              onChange={handleFeaturedImageUpload} className="mt-1 p-2 border border-gray-200 rounded-md w-full" />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Gallery</label>
              <label htmlFor='uploadImageInput'>
              <div className='p-2 bg-slate-100 border border-gray-200 rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                  <span className='text-4xl'><CloudDownload/></span>
                  <p className='text-sm'>Upload Product Image</p>
                  <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct}/>
                </div>
              </div>
              </label>

            </div>
            <div>
               {
                 productImages.length > 0 ? (
                     <div className='flex items-center gap-2'>
                         {
                           productImages.map((el, index)=>{
                            console.log(index)
                             return(
                               <div className='relative group'>
                                   <img
                                     src={el}
                                     alt={el}
                                     width={80}
                                     height={80}
                                     className='bg-slate-100 border cursor-pointer'
                                     onClick={()=>{
                                       setOpenFullScreenImage(true)
                                       setFullScreenImage(el)
                                     }}/>

                                     <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer'>
                                     </div>
                               </div>

                             )
                           })
                         }
                     </div>
                 ) : (
                   <p className='text-red-600 text-xs'>*Please upload product image</p>
                 )
               }

           </div>

            {/* Add other fields here... */}
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" className="px-4 py-2 bg-gray-200 rounded text-sm cursor-pointer" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={isSaveButtonDisabled} className={`px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 ${isSaveButtonDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
              {isUploadingFeaturedImage ? 'Uploading...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
      {/***display image full screen */}
      {
      openFullScreenImage && (
        <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
      )
      }


    </div>
  );
}

export default ProductFormLayout;
