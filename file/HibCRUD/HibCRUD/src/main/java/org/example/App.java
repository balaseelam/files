package org.example;


 import org.example.CarDao;
 import org.springframework.context.ApplicationContext;
 import org.springframework.context.annotation.AnnotationConfigApplicationContext;
 import org.springframework.context.support.ClassPathXmlApplicationContext;

public class App {
    public static void main(String[] args) {

        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        CarDao carDao = context.getBean(CarDao.class);

        carDao.addCar(880000, "nexus");
        //CarEntity car = carDao.getCar(1);
        //System.out.println("Retrieved car: " + car);

        //carDao.updateCar(1, 755000, "TATA");
        //carDao.deleteCar(4);


    }
}
