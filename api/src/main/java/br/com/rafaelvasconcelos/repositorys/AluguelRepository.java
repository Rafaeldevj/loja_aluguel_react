package br.com.rafaelvasconcelos.repositorys;

import br.com.rafaelvasconcelos.models.Aluguel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Temporal;
import org.springframework.data.repository.query.Param;

import javax.persistence.TemporalType;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface AluguelRepository extends JpaRepository<Aluguel, Long> {

    Optional<Aluguel> findById(Long id);

    @Query("select a from Aluguel a where a.dataDevolucao between current_date and :nexdays and a.aluguelSituacao.id = 2")
    List<Aluguel> findAluguels(@Param("nexdays") @Temporal(TemporalType.DATE) Date nexdays);

    @Query("select a from Aluguel a where a.dataDevolucao between current_date and :nexdays and a.aluguelSituacao.id = 3")
    List<Aluguel> findReservas(@Param("nexdays") @Temporal(TemporalType.DATE) Date nexdays);
}
