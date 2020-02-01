package br.com.rafaelvasconcelos.controllers;

import br.com.rafaelvasconcelos.helpers.ModeloCRUD;
import br.com.rafaelvasconcelos.models.Aluguel;
import br.com.rafaelvasconcelos.models.AluguelSituacao;
import br.com.rafaelvasconcelos.models.Item;
import br.com.rafaelvasconcelos.repositorys.AluguelRepository;
import br.com.rafaelvasconcelos.repositorys.AluguelSituacaoRepository;
import br.com.rafaelvasconcelos.repositorys.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping(value = "/api/aluguel")
public class AluguelController implements ModeloCRUD<Aluguel>, WebMvcConfigurer {

    private static final String SLASH = "/";
    private static final String PATH_LISTAR = "listar";
    private static final String PATH_BUSCAR = "buscar";
    private static final String PATH_CADASTRAR = "cadastrar";
    private static final String PATH_ATUALIZAR = "atualizar";
    private static final String PATH_CANCELAR = "cancelar";
    private static final String PATH_DASHBOARD_ALUGUEL = "dashboard_aluguel";
    private static final String PATH_DASHBOARD_RESERVA = "dashboard_reserva";

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                        "*")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true)
        ;
    }

    @Autowired
    private AluguelRepository aluguelRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private AluguelSituacaoRepository aluguelSituacaoRepository;

    @Override
    @GetMapping(SLASH + PATH_LISTAR)
    public List<Aluguel> listar() {
        return aluguelRepository.findAll();
    }

    @Override
    @GetMapping(SLASH + PATH_BUSCAR + SLASH + "{id}")
    public Optional<Aluguel> buscar(@PathVariable(name = "id") Long id) {
        return aluguelRepository.findById(id);
    }

    //Este método será tratado como o aluguel do item
    @Override
    @PostMapping(SLASH + PATH_CADASTRAR)
    public Aluguel cadastrar(@RequestBody Aluguel aluguel) {

        long diferencaTempo = aluguel.getDataDevolucao().getTime() - aluguel.getDataAluguel().getTime();
        long diferencaDias = TimeUnit.DAYS.convert(diferencaTempo, TimeUnit.MILLISECONDS);

        if (diferencaDias < 1) {
            return null;
        }

        Optional<Item> item = itemRepository.findById(aluguel.getItem().getId());

        BigDecimal valorItem = new BigDecimal(String.valueOf(item.get().getValor()));
        BigDecimal numeroDias = new BigDecimal(String.valueOf(diferencaDias));
        BigDecimal valorAluguel = valorItem.multiply(numeroDias);

        aluguel.setValor(valorAluguel.floatValue());

        AluguelSituacao aluguelSituacao = new AluguelSituacao();

        if (aluguel.isReserva()) {

            aluguelSituacao.setId((long) 3);
        } else {

            aluguelSituacao.setId((long) 2);
        }
        aluguel.setAluguelSituacao(aluguelSituacao);

        item.get().setDisponivel("N");
        itemRepository.save(item.get());

        return aluguelRepository.save(aluguel);
    }

    @Override
    @PutMapping(SLASH + PATH_ATUALIZAR)
    public Aluguel atualizar(@RequestBody Aluguel aluguel) {

        long diferencaTempo = aluguel.getDataDevolucao().getTime() - aluguel.getDataAluguel().getTime();
        long diferencaDias = TimeUnit.DAYS.convert(diferencaTempo, TimeUnit.MILLISECONDS);

        if (diferencaDias < 1) {
            return null;
        }

        aluguel.setDataAluguel(aluguel.getDataAluguel());

        Optional<Item> item = itemRepository.findById(aluguel.getItem().getId());

        BigDecimal valorItem = new BigDecimal(String.valueOf(item.get().getValor()));
        BigDecimal numeroDias = new BigDecimal(String.valueOf(diferencaDias));
        BigDecimal valorAluguel = valorItem.multiply(numeroDias);

        aluguel.setValor(valorAluguel.floatValue());

        AluguelSituacao aluguelSituacao = new AluguelSituacao();

        if (aluguel.isReserva()) {

            aluguelSituacao.setId((long) 3);
        } else {

            aluguelSituacao.setId((long) 2);
        }
        aluguel.setAluguelSituacao(aluguelSituacao);

        item.get().setDisponivel("N");
        itemRepository.save(item.get());

        return aluguelRepository.save(aluguel);
    }

    @GetMapping(SLASH + PATH_CANCELAR + SLASH + "{id}")
    public Aluguel cancelarReserva(@PathVariable(name = "id") long id) {

        Optional<Aluguel> aluguel = aluguelRepository.findById(id);

        Optional<Item> item = itemRepository.findById(aluguel.get().getItem().getId());
        item.get().setDisponivel("S");
        itemRepository.save(item.get());

        AluguelSituacao aluguelSituacao = new AluguelSituacao();
        aluguelSituacao.setId((long) 1);
        aluguel.get().setAluguelSituacao(aluguelSituacao);

        return aluguelRepository.save(aluguel.get());
    }

    @GetMapping(SLASH + PATH_DASHBOARD_ALUGUEL )
    public List<Aluguel> dashboardAluguel() {


        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE, 7);

        System.out.println(calendar.getTime());

        return aluguelRepository.findAluguels(calendar.getTime());
    }

    @GetMapping(SLASH + PATH_DASHBOARD_RESERVA )
    public List<Aluguel> dashboardReserva() {


        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE, 7);

        return aluguelRepository.findReservas(calendar.getTime());
    }

}
