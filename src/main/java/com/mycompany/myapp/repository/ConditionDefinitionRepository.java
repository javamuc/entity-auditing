package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.ConditionDefinition;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the ConditionDefinition entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConditionDefinitionRepository extends MongoRepository<ConditionDefinition, String> {

}
