package org.example;


import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class App
{
    public static void main( String[] args )
    {

//        CarDao car = new CarDao();
//        car.addCar(780000 , "Kia");
//        car.getCar(6);
//        car.updateCar(1 , 755000 ,"TATA");
//       car.deleteCar(4);

        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        CarDao carDao = context.getBean(CarDao.class);

      //   To save a new car
        CarEntity car = new CarEntity();
        car.setName("Toyota");
        car.setPrice(880000);

        carDao.save(car);

        //to find car
       //carDao.findById(3);

       //to update
//        CarEntity car = new CarEntity();
//        car.setId(8);
//        car.setName("Volvo");
//        car.setPrice(990000);
//        carDao.update(car);

        //to delete car
       //carDao.delete(6);

    }

}
