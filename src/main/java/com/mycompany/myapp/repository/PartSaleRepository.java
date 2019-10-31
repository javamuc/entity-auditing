package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.PartSale;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the PartSale entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PartSaleRepository extends MongoRepository<PartSale, String> {

}
