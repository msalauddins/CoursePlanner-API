//for reset we will drop db first and then will insert all data again

//drop database
var db = connect('127.0.0.1:27017/course_planner'),
    alltest = null;

db.dropDatabase();
print('---------------Database dropped!---------------');

//create the test database and connect to it
var db = connect('127.0.0.1:27017/course_planner'),
    alltest = null;

//create the names collection and add documents to it
db.areas.insert([
   { "area_id": "BD001", "name": "Dhaka","image": "http://192.168.0.140:3000/images/Lalbagh.jpg" },
   { "area_id": "BD002", "name": "Cox's Bazar","image": "http://192.168.0.140:3000/images/Cox_s-Bazar.jpg" }
]);

db.courses.insert([
   { "area_id": "BD001", "course_id": "BD001_dha_dha001", "title": "A day at Dhaka", "description": "Capital city with immensely colorful life", "course_time": 20700, "legs":[{"id":"dha_01","type":"transit","leg_time":5400},{"id":"dha_02","type":"transit","leg_time":3600}],"spots":[{"id":"dha_01","latitude":21.4272,"longitude":92.0058,"name":"Lalbagh Fort","image":"http://192.168.0.140:3000/images/Lalbagh.jpg"},{"id":"dha_02","latitude":21.4272,"longitude":92.0058,"name":"Dhakeshwari Temple","image":"http://192.168.0.140:3000/images/Dhakeshwari-Temple.jpg"}],"transits":[{"id":"dhaka_t1","origin":{"name":"Station X","type":"station","latitude":21.4272,"longitude":92.0058},"destination":{"name":"Station Y","type":"station","latitude":21.4272,"longitude":92.0058}},{"id":"dhaka_t2","origin":{"name":"Station X","type":"station","latitude":21.4272,"longitude":92.0058},"destination":{"name":"Station Y","type":"station","latitude":21.4272,"longitude":92.0058}}],"tags":["Temple","fort"]},
   { "area_id": "BD001", "course_id": "BD001_dha_dha002", "title": "A day at Dhaka", "description": "Hystorical Dhaka city", "course_time": 21500, "legs":[{"id":"dha_03","type":"transit","leg_time":17800},{"id":"dha_04","type":"transit","leg_time":3700}],"spots":[{"id":"dha_03","latitude":21.4272,"longitude":92.0058,"name":"Ahsan Manjil","image":"http://192.168.0.140:3000/images/Ahsan-Manjil.jpg"},{"id":"dha_04","name":"National Memorial","image":"http://192.168.0.140:3000/images/National-Memorial.jpeg","latitude":21.4272,"longitude":92.0058}],"transits":[{"id":"dhaka_t3","origin":{"name":"Station X","type":"station","latitude":21.4272,"longitude":92.0058},"destination":{"name":"Station Y","type":"station","latitude":21.4272,"longitude":92.0058}},{"id":"dhaka_t4","origin":{"name":"Station X","type":"station","latitude":21.4272,"longitude":92.0058},"destination":{"name":"Station Y","type":"station","latitude":21.4272,"longitude":92.0058}}],"tags":["fort","memorial"]},
   { "area_id": "BD002", "course_id": "BD002_cox_cox001", "title": "A day at Cox's Bazar", "description": "Inanni \u0026 Himchori","course_time":20700,"legs":[{"id":"cox_01","type":"transit","leg_time":5400},{"id":"cox_02","type":"transit","leg_time":3600}],"spots":[{"id":"cox_01","latitude":21.4272,"longitude":92.0058,"name":"Inani beach","image":"http://192.168.0.140:3000/images/Cox_s-Bazar.jpg"},{"id":"cox_02","latitude":21.4272,"longitude":92.0058,"name":"Himchori","image":"http://192.168.0.140:3000/images/Himchori.jpg"}],"transits":[{"id":"cox_t1","origin":{"name":"Station X","type":"station","latitude":21.4272,"longitude":92.0058},"destination":{"name":"Station Y","type":"station","latitude":21.4272,"longitude":92.0058}},{"id":"cox_t2","origin":{"name":"Station X","type":"station","latitude":21.4272,"longitude":92.0058},"destination":{"name":"Station Y","type":"station","latitude":21.4272,"longitude":92.0058}}],"tags":["Temple","fort"]},
   { "area_id": "BD002", "course_id": "BD002_cox_cox002", "title": "A day at Cox's Bazar", "description": "Moheshkhali \u0026 Dulahazara","course_time":20700,"legs":[{"id":"cox_03","type":"transit","leg_time":5400},{"id":"cox_04","type":"transit","leg_time":3600}],"spots":[{"id":"cox_03","latitude":21.4272,"longitude":92.0058,"name":"Moheshkhali Island","image":"http://192.168.0.140:3000/images/Moheshkhali-Island.jpg"},{"id":"cox_04","name":"Dulahazara Safari Park","image":"http://192.168.0.140:3000/images/Dulahazara-Safari-Park.jpg","latitude":21.4272,"longitude":92.0058}],"transits":[{"id":"cox_t3","origin":{"name":"Station X","type":"station","latitude":21.4272,"longitude":92.0058},"destination":{"name":"Station Y","type":"station","latitude":21.4272,"longitude":92.0058}},{"id":"cox_t4","origin":{"name":"Station X","type":"station","latitude":21.4272,"longitude":92.0058},"destination":{"name":"Station Y","type":"station","latitude":21.4272,"longitude":92.0058}}],"tags":["Temple","fort"]}
 ]);

db.users.insert([
   { "name": "User 1", "email": "user1@email.com", "uid": "u1", "pass": "1" },
   { "name": "User 2", "email": "user1@email.com", "uid": "u2", "pass": "2" }
 ]);


//set a reference to all documents in the database
alltest = db.names.find();
 
//iterate the names collection and output each document
while (alltest.hasNext()) {
   printjson(alltest.next());
}