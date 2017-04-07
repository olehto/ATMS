package com.atms.repository;

import com.atms.model.Keyword;
import com.atms.model.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by EvSpirit on 06.04.2017.
 */
@Repository
public interface PasswordTokenRepository extends JpaRepository<PasswordResetToken, Integer> {
}
