class Employee {
    //constructing
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;

        //0 - Unassigned, 1 - Manager, 2 - Engineer, 3 - Intern
        this.type = 0;
    }

    // Method to set as a type with accompanyinng data;
    setAs(type, data){
        this.type = type;
        this.data = data;
    }

    //Get Info From Class
    getInfo(){
        let fullType = "none";

        //Transfer type to string
        if (this.type = 1){
            fullType = "Manager";
        } else if(this.type = 2){
            fullType = "Engineer";
        } else if(this.type = 3){
            fullType = "Intern";
        }

        //Putting full data into array and returning it
        const allData = [this.name, fullType, this.id, this.email, this.data];
        return allData;
    }
  }