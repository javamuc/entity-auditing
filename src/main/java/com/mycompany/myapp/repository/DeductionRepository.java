package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.Deduction;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Deduction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DeductionRepository extends MongoRepository<Deduction, String> {

}
