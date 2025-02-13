

const searchCollegeDatabase= async (collegeName, database) => {
    // const results = await database.results;
   
    const foundSchool = database.results.find(result => result["school.name"] === collegeName);
    if (foundSchool) {
        return foundSchool;
    }
    else{
        return "School not found";
    }


}


module.exports = { searchCollegeDatabase };
