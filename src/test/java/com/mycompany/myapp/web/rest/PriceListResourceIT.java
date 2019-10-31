package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.EntityAuditingApp;
import com.mycompany.myapp.domain.PriceList;
import com.mycompany.myapp.repository.PriceListRepository;
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


import java.time.LocalDate;
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
 * Integration tests for the {@link PriceListResource} REST controller.
 */
@SpringBootTest(classes = EntityAuditingApp.class)
public class PriceListResourceIT {

    private static final LocalDate DEFAULT_VALID_FROM = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_VALID_FROM = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_VALID_TILL = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_VALID_TILL = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATED_AT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_AT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_LAST_UPDATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_LAST_UPDATED_BY = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_LAST_UPDATED_AT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_LAST_UPDATED_AT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private PriceListRepository priceListRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restPriceListMockMvc;

    private PriceList priceList;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PriceListResource priceListResource = new PriceListResource(priceListRepository);
        this.restPriceListMockMvc = MockMvcBuilders.standaloneSetup(priceListResource)
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
    public static PriceList createEntity() {
        PriceList priceList = new PriceList()
            .validFrom(DEFAULT_VALID_FROM)
            .validTill(DEFAULT_VALID_TILL)
            .type(DEFAULT_TYPE)
            .createdBy(DEFAULT_CREATED_BY)
            .createdAt(DEFAULT_CREATED_AT)
            .lastUpdatedBy(DEFAULT_LAST_UPDATED_BY)
            .lastUpdatedAt(DEFAULT_LAST_UPDATED_AT);
        return priceList;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PriceList createUpdatedEntity() {
        PriceList priceList = new PriceList()
            .validFrom(UPDATED_VALID_FROM)
            .validTill(UPDATED_VALID_TILL)
            .type(UPDATED_TYPE)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .lastUpdatedBy(UPDATED_LAST_UPDATED_BY)
            .lastUpdatedAt(UPDATED_LAST_UPDATED_AT);
        return priceList;
    }

    @BeforeEach
    public void initTest() {
        priceListRepository.deleteAll();
        priceList = createEntity();
    }

    @Test
    public void createPriceList() throws Exception {
        int databaseSizeBeforeCreate = priceListRepository.findAll().size();

        // Create the PriceList
        restPriceListMockMvc.perform(post("/api/price-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(priceList)))
            .andExpect(status().isCreated());

        // Validate the PriceList in the database
        List<PriceList> priceListList = priceListRepository.findAll();
        assertThat(priceListList).hasSize(databaseSizeBeforeCreate + 1);
        PriceList testPriceList = priceListList.get(priceListList.size() - 1);
        assertThat(testPriceList.getValidFrom()).isEqualTo(DEFAULT_VALID_FROM);
        assertThat(testPriceList.getValidTill()).isEqualTo(DEFAULT_VALID_TILL);
        assertThat(testPriceList.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testPriceList.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testPriceList.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testPriceList.getLastUpdatedBy()).isEqualTo(DEFAULT_LAST_UPDATED_BY);
        assertThat(testPriceList.getLastUpdatedAt()).isEqualTo(DEFAULT_LAST_UPDATED_AT);
    }

    @Test
    public void createPriceListWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = priceListRepository.findAll().size();

        // Create the PriceList with an existing ID
        priceList.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restPriceListMockMvc.perform(post("/api/price-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(priceList)))
            .andExpect(status().isBadRequest());

        // Validate the PriceList in the database
        List<PriceList> priceListList = priceListRepository.findAll();
        assertThat(priceListList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllPriceLists() throws Exception {
        // Initialize the database
        priceListRepository.save(priceList);

        // Get all the priceListList
        restPriceListMockMvc.perform(get("/api/price-lists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(priceList.getId())))
            .andExpect(jsonPath("$.[*].validFrom").value(hasItem(DEFAULT_VALID_FROM.toString())))
            .andExpect(jsonPath("$.[*].validTill").value(hasItem(DEFAULT_VALID_TILL.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY)))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(sameInstant(DEFAULT_CREATED_AT))))
            .andExpect(jsonPath("$.[*].lastUpdatedBy").value(hasItem(DEFAULT_LAST_UPDATED_BY)))
            .andExpect(jsonPath("$.[*].lastUpdatedAt").value(hasItem(sameInstant(DEFAULT_LAST_UPDATED_AT))));
    }
    
    @Test
    public void getPriceList() throws Exception {
        // Initialize the database
        priceListRepository.save(priceList);

        // Get the priceList
        restPriceListMockMvc.perform(get("/api/price-lists/{id}", priceList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(priceList.getId()))
            .andExpect(jsonPath("$.validFrom").value(DEFAULT_VALID_FROM.toString()))
            .andExpect(jsonPath("$.validTill").value(DEFAULT_VALID_TILL.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY))
            .andExpect(jsonPath("$.createdAt").value(sameInstant(DEFAULT_CREATED_AT)))
            .andExpect(jsonPath("$.lastUpdatedBy").value(DEFAULT_LAST_UPDATED_BY))
            .andExpect(jsonPath("$.lastUpdatedAt").value(sameInstant(DEFAULT_LAST_UPDATED_AT)));
    }

    @Test
    public void getNonExistingPriceList() throws Exception {
        // Get the priceList
        restPriceListMockMvc.perform(get("/api/price-lists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updatePriceList() throws Exception {
        // Initialize the database
        priceListRepository.save(priceList);

        int databaseSizeBeforeUpdate = priceListRepository.findAll().size();

        // Update the priceList
        PriceList updatedPriceList = priceListRepository.findById(priceList.getId()).get();
        updatedPriceList
            .validFrom(UPDATED_VALID_FROM)
            .validTill(UPDATED_VALID_TILL)
            .type(UPDATED_TYPE)
            .createdBy(UPDATED_CREATED_BY)
            .createdAt(UPDATED_CREATED_AT)
            .lastUpdatedBy(UPDATED_LAST_UPDATED_BY)
            .lastUpdatedAt(UPDATED_LAST_UPDATED_AT);

        restPriceListMockMvc.perform(put("/api/price-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPriceList)))
            .andExpect(status().isOk());

        // Validate the PriceList in the database
        List<PriceList> priceListList = priceListRepository.findAll();
        assertThat(priceListList).hasSize(databaseSizeBeforeUpdate);
        PriceList testPriceList = priceListList.get(priceListList.size() - 1);
        assertThat(testPriceList.getValidFrom()).isEqualTo(UPDATED_VALID_FROM);
        assertThat(testPriceList.getValidTill()).isEqualTo(UPDATED_VALID_TILL);
        assertThat(testPriceList.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testPriceList.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testPriceList.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testPriceList.getLastUpdatedBy()).isEqualTo(UPDATED_LAST_UPDATED_BY);
        assertThat(testPriceList.getLastUpdatedAt()).isEqualTo(UPDATED_LAST_UPDATED_AT);
    }

    @Test
    public void updateNonExistingPriceList() throws Exception {
        int databaseSizeBeforeUpdate = priceListRepository.findAll().size();

        // Create the PriceList

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPriceListMockMvc.perform(put("/api/price-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(priceList)))
            .andExpect(status().isBadRequest());

        // Validate the PriceList in the database
        List<PriceList> priceListList = priceListRepository.findAll();
        assertThat(priceListList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deletePriceList() throws Exception {
        // Initialize the database
        priceListRepository.save(priceList);

        int databaseSizeBeforeDelete = priceListRepository.findAll().size();

        // Delete the priceList
        restPriceListMockMvc.perform(delete("/api/price-lists/{id}", priceList.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PriceList> priceListList = priceListRepository.findAll();
        assertThat(priceListList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PriceList.class);
        PriceList priceList1 = new PriceList();
        priceList1.setId("id1");
        PriceList priceList2 = new PriceList();
        priceList2.setId(priceList1.getId());
        assertThat(priceList1).isEqualTo(priceList2);
        priceList2.setId("id2");
        assertThat(priceList1).isNotEqualTo(priceList2);
        priceList1.setId(null);
        assertThat(priceList1).isNotEqualTo(priceList2);
    }
}
