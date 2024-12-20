package org.example;

import org.example.CarEntity;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.logging.Logger;

@Repository
public class CarDao {

    private static final Logger logger = Logger.getLogger(CarDao.class.getName());

    @Autowired
    private SessionFactory sessionFactory;

    @Transactional
    public void addCar(int price, String name) {
        try (Session session = sessionFactory.getCurrentSession()) {
            CarEntity car = new CarEntity();
            car.setPrice(price);
            car.setName(name);
            session.save(car);
            logger.info("Added car successfully...");
        } catch (Exception e) {
            logger.severe("Error adding car: " + e.getMessage());
        }
    }

    @Transactional(readOnly = true)
    public CarEntity getCar(int id) {
        try (Session session = sessionFactory.getCurrentSession()) {
            return session.get(CarEntity.class, id);
        } catch (Exception e) {
            logger.severe("Error fetching car: " + e.getMessage());
            return null;
        }
    }

    @Transactional
    public void updateCar(int id, int price, String name) {
        try (Session session = sessionFactory.getCurrentSession()) {
            CarEntity car = session.get(CarEntity.class, id);
            if (car != null) {
                car.setPrice(price);
                car.setName(name);
                session.update(car);
                logger.info("Updated car successfully...");
            }
        } catch (Exception e) {
            logger.severe("Error updating car: " + e.getMessage());
        }
    }

    @Transactional
    public void deleteCar(int id) {
        try (Session session = sessionFactory.getCurrentSession()) {
            CarEntity car = session.get(CarEntity.class, id);
            if (car != null) {
                session.delete(car);
                logger.info("Deleted car successfully...");
            }
        } catch (Exception e) {
            logger.severe("Error deleting car: " + e.getMessage());
        }
    }
}

