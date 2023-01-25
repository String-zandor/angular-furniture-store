import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product } from '../../models/product';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {


  @Output () products = new EventEmitter<{result: Product[]}>()

  //Product List Sample
  productList: Product[] = [];
  
  /***** COMMENTED OUT DUE TO COMPILATION ERRORS

  productList: Product[] = [{
    id: 1,
    srcUrl: { color1: "black", color2: "grey" },
    name: "something called chair",
    category: "chairs",
    color: ["grey"],
    description: { desc: "A white chair", dimensions: "120cm X 200cm", material: "cloth", weight: "45kg" },
    postingDate: new Date('2017-04-01'),
    price: 15000
  },
  {
    id: 1,
    srcUrl: { color1: "black", color2: "grey" },
    name: "something called table",
    category: "table",
    color: ["black"],
    description: { desc: "A white table", dimensions: "120cm X 200cm", material: "cloth", weight: "45kg" },
    postingDate: new Date('2017-04-01'),
    price: 15999
  },
  {
    id: 1,
    srcUrl: { color1: "black", color2: "grey" },
    name: "something called cabinet",
    category: "cabinet",
    color: ["grey"],
    description: { desc: "A white cabinetvwith chair", dimensions: "120cm X 200cm", material: "cloth", weight: "45kg" },
    postingDate: new Date('2017-04-01'),
    price: 20000
  },
  {
    id: 1,
    srcUrl: { color1: "black", color2: "grey" },
    name: "HAMMARN COUNTER BAR CHAIR (VINTAGE GRAY FAUX LEATHER)",
    category: "cabinet",
    color: ["grey"],
    description: { desc: "A white cabinet", dimensions: "120cm X 200cm", material: "cloth", weight: "45kg" },
    postingDate: new Date('2017-04-01'),
    price: 20000
  },

]
*******/

  searchInput = new FormControl('');
  result: Product[] | undefined

  searchProduct(){

    this.result = this.productList.filter(product => product.name.toLowerCase().match(this.searchInput.value?.toLowerCase() as string) ||
    product.category.match(this.searchInput.value as string) || product.description.desc.match(this.searchInput.value as string) )

    this.products.emit({result: this.result})
  }
}
