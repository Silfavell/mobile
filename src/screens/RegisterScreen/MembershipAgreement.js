import React from 'react'
import { FlatList, Dimensions, Text } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import Modal, {
    ModalTitle,
    ModalButton,
    ModalFooter
} from 'react-native-modals'

const Item = ({ item: { type, mark, content } }) => (
    <Text style={{
        [type === 0 ? 'marginVertical' : 'marginBottom']: 12
    }}>
        <Text style={styles.fontWeight}>{mark}</Text>
        {content}
    </Text>
)

const items = [
    {
        type: 0,
        mark: 'A - ',
        content: 'Taraflar ve Konu'
    },
    {
        type: 1,
        mark: '1 - ',
        content: 'Bu sözleşme silfavell.com sitesine üye olmak isteyen internet kullanıcısı (sözleşmenin devam eden hükümlerinde üye olarak anılacaktır) ile Silfavell şirketi (sözleşmenin devam eden hükümlerinde Silfavell olarak anılacaktır) arasında akdedilmiştir.'
    },
    {
        type: 1,
        mark: '2 - ',
        content: 'Bu sözleşme Silfavell’e ait internet sitesinden üyenin faydalanmasına ilişkin şartları ve üyelik ilişkisine ilişkin hak ve borçları düzenler'
    },
    {
        type: 0,
        mark: 'B - ',
        content: 'Hak ve Yükümlülükler'
    },
    {
        type: 1,
        mark: '3 - ',
        content: 'Üye, internet sitesine üye olurken kendisinden talep edilen bilgileri güncel ve doğru bir şekilde beyan etmekle yükümlüdür. Silfavell, Üye tarafından bilgilerin eksik, yanlış veya güncel olmamasından kaynaklı uğrayacağı bütün zararları Üye’den talep edebilir. Üye eksik, yanlış veya güncel olmayan bilgi vermekten ötürü Silfavell’in uğrayacağı bütün zararları tazmin edeceğini kabul ve beyan eder.'
    },
    {
        type: 1,
        mark: '4 - ',
        content: 'Üye, internet sitesine giriş için belirlenen şifreyi başka kişi veya kuruluşlara açıklayamaz, veremez. Şifre bizzat üye tarafından kullanılabilir. Aksi gibi bir davranış nedeniyle doğabilecek bütün sorumluluk Üye’ye aittir. Üye’nin şifreyi başka kişi veya kuruluşlara açıklaması nedeniyle üçüncü kişilerin ve kamu kurumlarının Silfavell’e karşı herhangi bir iddia ileri sürmeleri halinde Silfavell her türlü tazminat ve sair talepleri için Üye’nin sorumluluğuna gidebilir.'
    },
    {
        type: 1,
        mark: '5 - ',
        content: 'Üye, internet sitesini kullanırken en geniş anlamda bütün hukuk kurallarına uyacağını, bunları ihlal etmemeyi kabul ve taahhüt eder. Aksi gibi bir davranışta bütün sorumluluk Üye’ye aittir.'
    },
    {
        type: 1,
        mark: '6 - ',
        content: 'Üye, internet sitesini kullanırken kamu düzenini bozucu, suç teşkil eden, Silfavell’in ve başka kimselerin kişilik hakkını ihlal eden, fikri ve sınai haklarını ihlal eden, kişileri rahatsız eden, taciz eden, yaş, ırk, cinsiyet ve sair şekillerde ayrımcılık yaratan, kişilerin sağlıklı bir çevrede yaşama hakkını ve hayvan haklarını ihlal eden veya başka kimseleri bu türde fiillere teşvik eden davranışlarda bulunamaz. Üye, internet sitesinden veya Silfavell’in sunduğu diğer hizmetlerden başka kimselerin yararlanmasını önlemeye zorlaştırmaya yönelik (truva atı, virüs, spam vb.) kullanımlar yapamaz. Üye, internet sitesi üzerinden veya internet sitesinde kendisine sağlanan hizmetleri kullanarak başka kişi ve kuruluşların koruma altında olan bilgilerine verilerine erişmeye yönelik faaliyetlerde bulunmayacaktır. Aksine bir davranıştan dolayı Silfavell sorumlu tutulamaz.'
    },
    {
        type: 1,
        mark: '7 - ',
        content: 'Üye, internet sitesini kullanırken herhangi bir ürün veya hizmete ilişkin tanıtım yapamaz. Üye internet sitesini oluştururken kendi kişisel görüşlerini açıklar. Üye, internet sitesinde yer alan ürün ve hizmetlerle ilgisi olmayan, ifade özgürlüğünün sınırlarının dışında paylaşımlarda bulunamaz. Üye’nin fikirleri ve açıklamaları Silfavell’i bağlamaz.'
    },
    {
        type: 1,
        mark: '8 - ',
        content: 'Üyelik sözleşmesinde belirtilen yükümlülüklerin herhangi birine aykırı davranıştan doğan hukuki ve cezai sorumluluk yalnızca üyeye aittir. Üye, üyelik ilişkisine aykırı davranışları neticesinde üçüncü kişiler ve kamu kurumları nezdinde Silfavell’e karşı yöneltilecek iddialardan ve sorumluluk taleplerinden Silfavell’i ari kılacaktır.'
    },
    {
        type: 1,
        mark: '9 - ',
        content: 'İnternet sitesinin tasarımı, Silfavell markası ve Silfavell’e ait ürünlerde yer alan, marka, logo ve tasarımlar ve internet sitesi üzerinden Üye’ye sunulan hizmetler Fikri ve Sınai Mülkiyet Hukuku çerçevesinde koruma altındadır. İnternet sitesinde yer alan ve başka kişi ve kuruluşlara ait ürünlerde yer alan marka, logo ve tasarımlar ve hizmetler üzerinde de bunların sahibi kişi ve kuruluşların Fikri ve Sınai Mülkiyet Hukukundan doğan hakları bulunmaktadır.'
    },
    {
        type: 1,
        mark: '10 - ',
        content: 'Taraflar arasındaki üyelik ilişkisinin akdedilmiş olması, bu sözleşmede tanınan hakların dışında üye’nin Silfavell’in müşteri kart programına dahil olduğu anlamına gelmez. Üyelik ilişkisinden sonra Üye, Silfavell müşteri kart programına site üzerinden başvurabilir. Üyelik ilişkisinden önce üyenin Silfavell müşteri kart programında bir üyeliği varsa üyenin hesabı ile kart üyeliği, Silfavell tarafından ilişkilendirilir. Üye, sonradan başvuru veya mevcut kart üyeliğinin ilişkilendirilmesi neticesinde kart üyeliğine ilişkin bilgileri internet sitesi üzerinden de görüntüleyebilir. İlişkilendirilmenin yapılmaması nedeniyle Üye, Silfavellden herhangi bir hak talebinde bulunamaz.'
    },
    {
        type: 1,
        mark: '11 - ',
        content: 'İnternet sitesi üzerinden sunulan hizmetlerin iyileştirilmesi, Üye’nin siteden yararlanmasının kolaylaştırılması ve kanun hükümleri gereği siteye erişmek için kullanılan İnternet Servis Sağlayıcısının adı ve İnternet Protokol/IP adresi, erişim tarih ve saatleri, internet sitesinde erişilen sayfalar ve internet sitesine bağlanılmasını sağlayan internet sitesinin adresi gibi bilgiler toplanmaktadır.'
    },
    {
        type: 1,
        mark: '12 - ',
        content: 'Silfavell, Üye’nin bu üyelik sözleşmesi ile birlikte belirttiği Kişisel Veri İşleme Aydınlatma Bildirimi çerçevesinde sitenin kullanımı, üyelik ilişkisinden kaynaklı hak ve borçların yerine getirilmesi, Üye’nin ilgi alanlarının belirlenerek internet sitesi üzerinde üye’ye önerilerde bulunulması için üyenin kişisel verilerini işlemektedir.'
    },
    {
        type: 1,
        mark: '13 - ',
        content: 'Silfavell, üyelik ilişkisinden kaynaklı hakların kullanımında güvenliği sağlama, üyenin kişisel verilerinin güvenliğini sağlama amaçları ile üyelerle SMS veya elektronik posta iletileri yoluyla doğrulama işlemi için iletişime geçebilir veya bu iletişimin sağlanması amacıyla üye verilerini bağlı bulunduğu iştirakleri veya üçüncü kişi çözüm ortaklarına aktarabilir.'
    },
    {
        type: 1,
        mark: '',
        content: 'Silfavell, üye ile üyelik ilişkisi kapsamında sunulan hizmetlerin kalitesini artırma, üyelere daha iyi hizmet sunma, üyelerin şikayetlerine çözüm bulmak amacıyla üyelere SMS veya elektronik posta iletileri yoluyla anket formları gönderebilir veya bu iletişimin sağlanması amacıyla üye verilerini bağlı bulunduğu iştirakleri veya üçüncü kişi çözüm ortaklarına aktarabilir.'
    },
    {
        type: 1,
        mark: '',
        content: 'Silfavell, üyenin kendisine bildirdiği kişisel verilerinin tamamını üyelik ilişkisi devam ettiği sürece kendisi, bağlı bulunduğu iştirakleri ve üçüncü kişi çözüm ortakları nezdinde saklayabilir. Üyelik ilişkisinin sona ermesinden sonra Silfavell, üyelik ilişkisinden kaynaklı olası hukuki uyuşmazlıkların doğru bir şekilde çözümü, üyenin üyelik ilişkisini ihlal ederek Silfavell’e veya üçüncü kişilere zarar verici davranışlarda bulunduğuna ilişkin iddiaların aydınlatılması amaçlarına bağlı olarak üyenin kişisel verilerini kendisi, bağlı bulunduğu iştirakleri ve üçüncü kişi çözüm ortakları nezdinde saklayabilir.'
    },
    {
        type: 1,
        mark: '',
        content: 'Silfavell, kamu kurumlarının emredici hukuk kuralları doğrultusunda talepte bulunması halinde üye kişisel verilerini talep eden kuruluşa açıklar.'
    },
    {
        type: 1,
        mark: '14 - ',
        content: 'Silfavell, internet sitesinin güvenliği için imkan dahilinde önlemler almıştır. Üye’nin de kullanıcı adı ve şifresi gibi üyelik ilişkisinden kaynaklı erişim bilgilerini güvenlik altına alması, kendisine ait veya kullanımında olan bilişim sistemini yetkin ve doğru araçlarla ( güvenlik duvarı, anti-virüs yazılımları vs) koruması gerekmektedir. Üye’nin aksi gibi bir davranışından kaynaklı olarak meydana gelecek zararlardan Silfavell sorumlu tutulamaz.'
    },
    {
        type: 1,
        mark: '15 - ',
        content: 'Silfavell, üyelik ilişkisi kapsamında sağladığı hizmetleri, internet sitesinin içeriğini tek taraflı değiştirme, üyelik ilişkisini sona erdirme ve internet sitesini kısmen veya tamamen faaliyetten kaldırma, üyelerin bütün bilgilerini silme haklarını saklı tutar. Üyelik sözleşmesi herhangi bir bildirim yapılmadan Silfavell tarafından değiştirilebilir. Üye, üyelik ilişkisini sonlandırmadığı sürece ilgili değişikliklerin yürürlük tarihinde kendisi hakkında da uygulanacağını kabul eder.'
    },
    {
        type: 1,
        mark: '16 - ',
        content: 'Üyelik sözleşmesinden kaynaklanan uyuşmazlıklarda Silfavell kayıt ve belgeleri HMK uyarınca münhasır ve yegane delil hükmündedir.'
    },
    {
        type: 0,
        mark: 'C - ',
        content: 'Sözleşmenin Sona Ermesi'
    },
    {
        type: 1,
        mark: '17 - ',
        content: 'Üye, üyelik ilişkisini internet sitesinde bu hak için ayrılmış bölümden her zaman sona erdirebilir. Silfavell, üyelik ilişkisini her zaman herhangi bir neden göstermeksizin veya üyenin üyelik sözleşmesinden kaynaklanan yükümlülüklerinden birini ihlal etmesi üzerine tek taraflı olarak sona erdirebilir.'
    },
    {
        type: 0,
        mark: 'D - ',
        content: 'Görevli ve Yetkili Mahkeme'
    },
    {
        type: 1,
        mark: '18 - ',
        content: 'Bu sözleşme Türk Hukukuna tabidir. Bu sözleşmeden kaynaklanan uyuşmazlıklarda İstanbul Mahkemeleri ve İcra Daireleri yetkili ve görevlidir.'
    },
    {
        type: 0,
        mark: 'E - ',
        content: 'Yürürlük'
    },
    {
        type: 1,
        mark: '19 - ',
        content: 'Bu üyelik sözleşmesi, üyelik süreci tamamlanmadan önce üyenin dikkatine sunulmuştur. Üyenin, üyelik kaydı yapması bu sözleşmede yer alan bütün hükümleri okuduğu ve bu hükümleri kabul ettiği anlamına gelir. Üyelik sözleşmesi üyelik kaydı yapılması ile yürürlüğe girer.'
    }
]

class MembershipAgreement extends React.PureComponent {
    close = () => {
        this.props.setPopupState({ scaleAnimationModal: false })
        return true
    }

    onConfirm = () => {
        this.props.setPopupState({ scaleAnimationModal: false })
    }

    renderItem = ({ item }) => <Item item={item} />

    render() {
        return (
            <Modal
                onTouchOutside={this.close}
                width={0.9}
                visible={this.props.scaleAnimationModal}
                onSwipeOut={this.close}
                onHardwareBackPress={this.close}
                modalTitle={(
                    <ModalTitle
                        style={styles.title}
                        textStyle={styles.titleText}
                        title={'Silfavell Elektronik Ticaret Sitesi Üyelik Sözleşmesi'}
                        hasTitleBar={false}
                    />
                )}
                footer={(
                    <ModalFooter style={styles.footer}>
                        <ModalButton
                            text='Kapat'
                            textStyle={styles.buttonText}
                            style={styles.buttonNo}
                            onPress={this.close}
                            key='button-1'
                        />
                    </ModalFooter>
                )}>
                <FlatList
                    data={items}
                    renderItem={this.renderItem}
                    style={styles.heightAndMargin} />
            </Modal>
        )
    }
}

const styles = ScaledSheet.create({
    footer: {
        height: '42@s'
    },
    buttonNo: {
        backgroundColor: '#697488'
    },
    buttonYes: {
        backgroundColor: 'rgba(0,0,0,.8)'
    },
    buttonText: {
        color: 'white'
    },
    titleText: {
        textAlign: 'center',
        fontSize: '16@s'
    },
    fontWeight: {
        fontWeight: 'bold'
    },
    heightAndMargin: {
        height: Dimensions.get('window').height / 2,
        margin: 20
    }
})

export default MembershipAgreement