package org.example;
import org.example.CarEntity;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class CarDao {

    @Autowired
    private SessionFactory sessionFactory;


    public void save(CarEntity car) {
        Session session = sessionFactory.getCurrentSession();
        session.save(car);
    }
    public CarEntity findById(int id) {
        return getCurrentSession().get(CarEntity.class, id);
    }
    public void update(CarEntity car) {
        Session session = sessionFactory.getCurrentSession();
        session.update(car);
    }
    public void delete(int id) {
        Session session = sessionFactory.getCurrentSession();
        CarEntity car = session.get(CarEntity.class , id);
           session.delete(car);

    }






    private Session getCurrentSession() {
        return sessionFactory.getCurrentSession();
    }
}


























//package org.example;
//
//import org.apache.log4j.Logger;
//import org.example.CarEntity;
//import org.hibernate.Session;
//import org.hibernate.SessionFactory;
//import org.hibernate.cfg.Configuration;
//


//public class CarDao {
//    private SessionFactory sessionFactory;
//    private static final org.apache.log4j.Logger logger = Logger.getLogger(CarDao.class);
//
//    public CarDao(){
//        sessionFactory = new Configuration().configure().buildSessionFactory();
//    }
//    public  void addCar( int price , String name){
//        try(Session session = sessionFactory.openSession()){
//            session.beginTransaction();
//            CarEntity car = new CarEntity();
//            car.setPrice(price);
//            car.setName(name);
//            session.save(car);
//            logger.info("Added car successfully...");
//            session.getTransaction().commit();
//            session.close();
//            sessionFactory.close();
//        }
//        catch(Exception e){
//            System.out.println(e);
//        }
//
//    }
//
//    public void getCar(int id){
//        try(Session session = sessionFactory.openSession()){
//            session.beginTransaction();
//            CarEntity car = session.get(CarEntity.class , id );
//            logger.info("Fetched car  .." + car);
//            session.getTransaction().commit();
//            session.close();
//            sessionFactory.close();
//        }
//        catch(Exception e){
//            System.out.println(e);
//        }
//
//    }
//    public  void updateCar (int id , int price , String name){
//        try(Session session = sessionFactory.openSession()){
//            session.beginTransaction();
//            CarEntity car = session.get(CarEntity.class , id);
//            car.setPrice(price);
//            car.setName(name);
//            session.save(car);
//            logger.info("Updated car successfully...");
//            session.getTransaction().commit();
//            session.close();
//            sessionFactory.close();
//        }
//        catch(Exception e){
//            System.out.println(e);
//        }
//    }
//    public void deleteCar (int id){
//        try(Session session = sessionFactory.openSession()){
//            session.beginTransaction();
//            CarEntity car = session.get(CarEntity.class , id);
//            session.delete(car);
//            logger.info("Deleted car successfully...");
//            session.getTransaction().commit();
//            session.close();
//            sessionFactory.close();
//        }
//        catch(Exception e){
//            System.out.println(e);
//        }
//    }
//}




