//Drop databases
var db = connect('127.0.0.1:27017/course_planner'),
    alltest = null;

db.dropDatabase();
print('---------------Database dropped!---------------');