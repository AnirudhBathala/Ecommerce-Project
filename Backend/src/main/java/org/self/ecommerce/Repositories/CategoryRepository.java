package org.self.ecommerce.Repositories;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.self.ecommerce.Models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    public Category findByName(String name);

    @Query("select c from Category c where c.name=:name and c.parent.name=:parentCategoryName")
    public Category findByNameAndParent(@Param("name") String name, @Param("parentCategoryName") String parentCategoryName);
}
