export class ComponentVisibiltyModel{
    locationFlag: boolean;
    deptFlag: boolean;
    catFlag: boolean;
    subCatFlag: boolean;

    constructor(locationFlag: boolean=true,
        deptFlag: boolean=false,
        catFlag: boolean=false,
        subCatFlag: boolean=false){

           this.locationFlag= locationFlag;
           this. deptFlag= deptFlag;
           this. catFlag= catFlag;
           this. subCatFlag= subCatFlag;
    }
}