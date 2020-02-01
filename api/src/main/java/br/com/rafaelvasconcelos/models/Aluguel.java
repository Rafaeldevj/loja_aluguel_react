package br.com.rafaelvasconcelos.models;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "tb_aluguel")
public class Aluguel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_aluguel")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "id_item")
    private Item item;

    @Column(columnDefinition = "DECIMAL(10,2)")
    private float valor;

    @ManyToOne
    @JoinColumn(name = "id_aluguel_situacao")
    private AluguelSituacao aluguelSituacao;

    @Column(name = "dt_aluguel")
    @Temporal(TemporalType.DATE)
    private Date dataAluguel;

    @Column(name = "dt_devolucao")
    @Temporal(TemporalType.DATE)
    private Date dataDevolucao;

    @Column(name = "dt_cadastro", insertable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dataCadastro;

    @Transient
    private boolean reserva;

    public Aluguel() {
    }

    public Aluguel(Cliente cliente, Item item, float valor, AluguelSituacao aluguelSituacao, Date dataAluguel, Date dataDevolucao, Date dataCadastro) {
        this.cliente = cliente;
        this.item = item;
        this.valor = valor;
        this.aluguelSituacao = aluguelSituacao;
        this.dataAluguel = dataAluguel;
        this.dataDevolucao = dataDevolucao;
        this.dataCadastro = dataCadastro;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public float getValor() {
        return valor;
    }

    public void setValor(float valor) {
        this.valor = valor;
    }

    public AluguelSituacao getAluguelSituacao() {
        return aluguelSituacao;
    }

    public void setAluguelSituacao(AluguelSituacao aluguelSituacao) {
        this.aluguelSituacao = aluguelSituacao;
    }

    public Date getDataAluguel() {
        return dataAluguel;
    }

    public void setDataAluguel(Date dataAluguel) {
        this.dataAluguel = dataAluguel;
    }

    public Date getDataDevolucao() {
        return dataDevolucao;
    }

    public void setDataDevolucao(Date dataDevolucao) {
        this.dataDevolucao = dataDevolucao;
    }

    public Date getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(Date dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public boolean isReserva() {
        return reserva;
    }

    public void setReserva(boolean reserva) {
        this.reserva = reserva;
    }
}
