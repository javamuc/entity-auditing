package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.EntityAuditingApp;
import com.mycompany.myapp.domain.Deduction;
import com.mycompany.myapp.repository.DeductionRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;


import java.math.BigDecimal;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.sameInstant;
import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link DeductionResource} REST controller.
 */
@SpringBootTest(classes = EntityAuditingApp.class)
public class DeductionResourceIT {

    private static final String DEFAULT_REASON = "AAAAAAAAAA";
    private static final String UPDATED_REASON = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_PRICE = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRICE = new BigDecimal(2);

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATED_AT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_AT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_LAST_UPDATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_LAST_UPDATED_BY = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_LAST_UPDATED_AT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_LAST_UPDATED_AT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private DeductionRepository deductionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restDeductionMockMvc;

    private Deduction deduction;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DeductionResource deductionResource = new DeductionResource(deductionRepository);
        this.restDeductionMockMvc = MockMvcBuilders.standaloneSetup(deductionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Deduction createEntity() {
        Deduction deduction = new Deduction()
            .reason(DEFAULT_REASON)
            .price(DEFAULT_PRICE)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .lastUpdatedBy(DEFAULT_LAST_UPDATED_BY)
            .lastUpdatedAt(DEFAULT_LAST_UPDATED_AT);
        return deduction;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Deduction createUpdatedEntity() {
        Deduction deduction = new Deduction()
            .reason(UPDATED_REASON)
            .price(UPDATED_PRICE)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .lastUpdatedBy(UPDATED_LAST_UPDATED_BY)
            .lastUpdatedAt(UPDATED_LAST_UPDATED_AT);
        return deduction;
    }

    @BeforeEach
    public void initTest() {
        deductionRepository.deleteAll();
        deduction = createEntity();
    }

    @Test
    public void createDeduction() throws Exception {
        int databaseSizeBeforeCreate = deductionRepository.findAll().size();

        // Create the Deduction
        restDeductionMockMvc.perform(post("/api/deductions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deduction)))
            .andExpect(status().isCreated());

        // Validate the Deduction in the database
        List<Deduction> deductionList = deductionRepository.findAll();
        assertThat(deductionList).hasSize(databaseSizeBeforeCreate + 1);
        Deduction testDeduction = deductionList.get(deductionList.size() - 1);
        assertThat(testDeduction.getReason()).isEqualTo(DEFAULT_REASON);
        assertThat(testDeduction.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testDeduction.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testDeduction.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testDeduction.getLastUpdatedBy()).isEqualTo(DEFAULT_LAST_UPDATED_BY);
        assertThat(testDeduction.getLastUpdatedAt()).isEqualTo(DEFAULT_LAST_UPDATED_AT);
    }

    @Test
    public void createDeductionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = deductionRepository.findAll().size();

        // Create the Deduction with an existing ID
        deduction.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeductionMockMvc.perform(post("/api/deductions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deduction)))
            .andExpect(status().isBadRequest());

        // Validate the Deduction in the database
        List<Deduction> deductionList = deductionRepository.findAll();
        assertThat(deductionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllDeductions() throws Exception {
        // Initialize the database
        deductionRepository.save(deduction);

        // Get all the deductionList
        restDeductionMockMvc.perform(get("/api/deductions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(deduction.getId())))
            .andExpect(jsonPath("$.[*].reason").value(hasItem(DEFAULT_REASON)))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY)))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(sameInstant(DEFAULT_CREATED_AT))))
            .andExpect(jsonPath("$.[*].lastUpdatedBy").value(hasItem(DEFAULT_LAST_UPDATED_BY)))
            .andExpect(jsonPath("$.[*].lastUpdatedAt").value(hasItem(sameInstant(DEFAULT_LAST_UPDATED_AT))));
    }
    
    @Test
    public void getDeduction() throws Exception {
        // Initialize the database
        deductionRepository.save(deduction);

        // Get the deduction
        restDeductionMockMvc.perform(get("/api/deductions/{id}", deduction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(deduction.getId()))
            .andExpect(jsonPath("$.reason").value(DEFAULT_REASON))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.intValue()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY))
            .andExpect(jsonPath("$.createdAt").value(sameInstant(DEFAULT_CREATED_AT)))
            .andExpect(jsonPath("$.lastUpdatedBy").value(DEFAULT_LAST_UPDATED_BY))
            .andExpect(jsonPath("$.lastUpdatedAt").value(sameInstant(DEFAULT_LAST_UPDATED_AT)));
    }

    @Test
    public void getNonExistingDeduction() throws Exception {
        // Get the deduction
        restDeductionMockMvc.perform(get("/api/deductions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateDeduction() throws Exception {
        // Initialize the database
        deductionRepository.save(deduction);

        int databaseSizeBeforeUpdate = deductionRepository.findAll().size();

        // Update the deduction
        Deduction updatedDeduction = deductionRepository.findById(deduction.getId()).get();
        updatedDeduction
            .reason(UPDATED_REASON)
            .price(UPDATED_PRICE)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .lastUpdatedBy(UPDATED_LAST_UPDATED_BY)
            .lastUpdatedAt(UPDATED_LAST_UPDATED_AT);

        restDeductionMockMvc.perform(put("/api/deductions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDeduction)))
            .andExpect(status().isOk());

        // Validate the Deduction in the database
        List<Deduction> deductionList = deductionRepository.findAll();
        assertThat(deductionList).hasSize(databaseSizeBeforeUpdate);
        Deduction testDeduction = deductionList.get(deductionList.size() - 1);
        assertThat(testDeduction.getReason()).isEqualTo(UPDATED_REASON);
        assertThat(testDeduction.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testDeduction.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testDeduction.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testDeduction.getLastUpdatedBy()).isEqualTo(UPDATED_LAST_UPDATED_BY);
        assertThat(testDeduction.getLastUpdatedAt()).isEqualTo(UPDATED_LAST_UPDATED_AT);
    }

    @Test
    public void updateNonExistingDeduction() throws Exception {
        int databaseSizeBeforeUpdate = deductionRepository.findAll().size();

        // Create the Deduction

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDeductionMockMvc.perform(put("/api/deductions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deduction)))
            .andExpect(status().isBadRequest());

        // Validate the Deduction in the database
        List<Deduction> deductionList = deductionRepository.findAll();
        assertThat(deductionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteDeduction() throws Exception {
        // Initialize the database
        deductionRepository.save(deduction);

        int databaseSizeBeforeDelete = deductionRepository.findAll().size();

        // Delete the deduction
        restDeductionMockMvc.perform(delete("/api/deductions/{id}", deduction.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Deduction> deductionList = deductionRepository.findAll();
        assertThat(deductionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Deduction.class);
        Deduction deduction1 = new Deduction();
        deduction1.setId("id1");
        Deduction deduction2 = new Deduction();
        deduction2.setId(deduction1.getId());
        assertThat(deduction1).isEqualTo(deduction2);
        deduction2.setId("id2");
        assertThat(deduction1).isNotEqualTo(deduction2);
        deduction1.setId(null);
        assertThat(deduction1).isNotEqualTo(deduction2);
    }
}
