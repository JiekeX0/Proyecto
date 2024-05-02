import { Autocomplete, TextField, Grid, Box } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { ProductCard } from "./ProductCard"
import { Product } from "../store/product/productStore"

interface Category{
    firstLetter: string,
    category: string
}

export const FilterByCategory = () => {
    
    let categories:Category [] = [];

    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
    const [products, setProducts] = useState<Product[]>([])

    function fetchCategory(){
        return fetch('https://fakestoreapi.com/products/categories')
            .then(res=>res.json())
            .then(json=>{
                return json
            })
    }
    
    function fetchSpecificCategory(category: string){
        return fetch(`https://fakestoreapi.com/products/category/${category}`)
            .then(res=>res.json())
            .then(json=>{
                return json
            })
    }

   const allCategories = useQuery({queryKey: ['categories'], queryFn: ()=>fetchCategory()})
   
 
      {allCategories.isLoading && <h1>Is Loading...</h1>}
      {allCategories.isError && <h1>Error...</h1>}
    
      if(allCategories.isSuccess){
           categories = allCategories?.data.map((category: string) => {
           const firstLetter = category[0].toUpperCase();
           return {
               firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
               category: category,
               }; 
           }); 
      }

      useEffect(() => {
        (async () => {
            if(selectedCategory !== null){
                const productsFetched = await fetchSpecificCategory(selectedCategory.category)
                setProducts(productsFetched)
            }
        })()

      },[selectedCategory])
    
      return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: "center",marginTop: 10, gap: 3 }}>
          <Autocomplete
            id="categories"
            options={categories?.sort((a: Category, b: Category) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(category: Category) => category.firstLetter}
            getOptionLabel={(category) => category.category}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Categories" />}
            value={selectedCategory}
            onChange={(_event, newCategory: Category | null) => {
                setSelectedCategory(newCategory)
            }}
            />
            {selectedCategory && 
                <Grid container direction="row" justifyContent='center' spacing={{ xs:3, md: 4}}> 
                    {products.map((product: Product)=>
                        <Grid item key={product.id}><ProductCard product={product}/></Grid>
                    )}
                </Grid>} 
        </Box>
      );
    }