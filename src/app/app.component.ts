import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'productApplication';
  myData:any = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [];
  
  constructor(private productService: ProductService ){}
  
  ngOnInit(): void {
    this.productService.getData().subscribe((data) => {
      this.myData = data;
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  tableToCSV() {
    var csv_data:any = [];
    var rows = document.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
        var cols = rows[i].querySelectorAll('td,th');
        var csvrow = [];
        for (var j = 0; j < cols.length; j++) {
            csvrow.push(cols[j].innerHTML);
        }
        csv_data.push(csvrow.join(","));
    }
    csv_data = csv_data.join('\n'); 
    this.downloadCSVFile(csv_data);
  }

  downloadCSVFile(csv_data: BlobPart) {
    const CSVFile = new Blob([csv_data], {
        type: "text/csv"
    });
    var temp_link = document.createElement('a');
    temp_link.download = "Products_Data.csv";
    var url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);
    temp_link.click();
    document.body.removeChild(temp_link);
  }
  
}
