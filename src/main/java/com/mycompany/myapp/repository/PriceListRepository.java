package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.PriceList;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the PriceList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PriceListRepository extends MongoRepository<PriceList, String> {

}
