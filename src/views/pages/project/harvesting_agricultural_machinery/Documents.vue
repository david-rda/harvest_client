<template>
    <h6 class="col-md-4 mt-4">წარმოსადგენი დოკუმენტაციის ნუსხა</h6>
    
    <!-- პირადობის მოწმობის ასლის ფაილის ბლოკი-->
    <div class="row">
        <div class="mb-3 mt-4 col-lg-12 col-md-12 col-xs-12 col-sm-12">
            <div class="file_block p-3">
                <input type="file" v-on:change="handlePersonalId($event)" ref="personal_id_file">
                <button type="button" class="col-md-3 col-lg-3" v-on:click="openPersonalIdFile()">ფაილის არჩევა&nbsp;<BIconFolder2 /></button>
                <span>პოტენციური ბენეფიციარის პირადობის მოწმობის ასლი.</span>
            </div>
        </div>
    </div>
    <!-- პირადობის მოწმობის ასლის ფაილის ბლოკი -->
    <div class="row">
        <div class="mb-3 mt-4 col-lg-12 col-md-12 col-xs-12 col-sm-12">
            <div class="file_block p-3">
                <input type="file" v-on:change="handlePersonalId1($event)" ref="personal_id_file1">
                <button type="button" class="col-md-3 col-lg-3" v-on:click="openFile()">ფაილის არჩევა&nbsp;<BIconFolder2 /></button>
                <span>წარმომადგენლობაზე უფლებამოსილი პირის პირადობის მოწმობის ასლი და უფლებამოსილების დამადასტურებელი დოკუმენტი (ასეთის არსებობის შემთხვევაში).</span>
            </div>
        </div>
    </div>
    <!-- კომერციული პირის ამონაწერის ბლოკი -->
    <div class="row">
        <div class="mb-3 mt-4 col-lg-12 col-md-12 col-xs-12 col-sm-12">
            <div class="file_block p-3">
                <input type="file" v-on:change="entrepreneurFile($event)" ref="entrepreneurFile">
                <button type="button" class="col-md-3 col-lg-3" v-on:click="openEntrepreneurDocument()">ფაილის არჩევა&nbsp;<BIconFolder2 /></button>
                <span>ამონაწერი მეწარმეთა და არასამეწარმეო (არაკომერციული) იურიდიული პირების რეესტრიდან (იურიდიული პირის შემთხვევაში).</span>
            </div>
        </div>
    </div>

    <!-- იურიდიული პირის ფაილის ბლოკი -->
    <div class="row">
        <div class="mb-3 mt-4 col-lg-12 col-md-12 col-xs-12 col-sm-12">
            <div class="file_block p-3">
                <input type="file" v-on:change="notaryFile($event)" ref="notaryFile">
                <button type="button" class="col-md-3 col-lg-3" v-on:click="openFileNotary()">ფაილის არჩევა&nbsp;<BIconFolder2 /></button>
                <span>იურიდიული პირების შემთხვევაში − ნოტარიული წესით დამოწმებული დამფუძნებლების/პარტნიორების კრების ოქმი პროგრამაში მონაწილეობისა და სააგენტოსთან გასაფორმებელი ხელშეკრულებით გათვალისწინებული ვალდებულებების აღების თაობაზე (ასეთის საჭიროების შემთხვევაში).</span>
            </div>
        </div>
    </div>

    <!-- ინვოისის ფაილის ბლოკი -->
    <div class="row">
        <div class="mb-3 mt-4 col-lg-12 col-md-12 col-xs-12 col-sm-12">
            <div class="file_block p-3">
                <input type="file" v-on:change="invoiceFile($event)" ref="invoiceFile">
                <button type="button" class="col-md-3 col-lg-3" v-on:click="openInvoiceFile()">ფაილის არჩევა&nbsp;<BIconFolder2 /></button>
                <span>შესასყიდი მიზნობრიობის ინვოისი ან/და ხელშეკრულება ქართულ ენაზე (ტექნიკის იმპორტის შემთხვევაში ნოტარიულად დამოწმებული თარგმანი), რომელიც აუცილებელი წესით უნდა მოიცავდეს შემდეგ ინფორმაციას: მოსავლის ამღები სასოფლო-სამეურნეო ტექნიკის დასახელება, მახასიათებლები (მოდელი, ცხ.ძ (ასეთის არსებობის შემთხვევაში), გამოშვების წელი, ექსპლუატაციაში არ ყოფნის შესახებ სტატუსი, მწარმოებელი ქვეყანა, დანიშნულება (აღწერილი უნდა იყოს თუ რა სასოფლო-სამეურნეო დანიშნულებით გამოიყენება წარმოდგენილი ტექნიკა), მხარეთა რეკვიზიტები, მიწოდების ვადა (არაუმეტეს 5 თვისა), გადახდის პირობები. შენიშვნა: ტექნიკის ადგილობრივი მომწოდებლის შემთხვევაში გადახდის პირობა აუცილებელი წესით უნდა მოიცავდეს შემდეგ ინფორმაციას, რომ სააგენტოს თანადაფინანსების თანხის გადახდა მოხდება ტექნიკის მიწოდების შემდეგ.</span>
            </div>
        </div>
    </div>

    <!-- სასოფლო სამეურნეო ტექნიკის ფაილის ბლოკი -->
    <div class="row">
        <div class="mb-3 mt-4 col-lg-12 col-md-12 col-xs-12 col-sm-12">
            <div class="file_block p-3">
                <input type="file" v-on:change="warantyFile($event)" ref="warantyFile">
                <button type="button" class="col-md-3 col-lg-3" v-on:click="openGrantDocumentFile()">ფაილის არჩევა&nbsp;<BIconFolder2 /></button>
                <span>სასოფლო-სამეურნეო ტექნიკის საგარანტიო დოკუმენტი (საგარანტიო პირობები უნდა ვრცელდებოდეს განაცხადის წარდგენიდან არანაკლებ 6 თვის ვადით) გაცემული მწარმოებლის ან/და მიმწოდებლის მიერ.</span>
            </div>
        </div>
    </div>

    <!-- სნობის ფაილის ბლოკი -->
    <div class="row">
        <div class="mb-3 mt-4 col-lg-12 col-md-12 col-xs-12 col-sm-12">
            <div class="file_block p-3">
                <input type="file" v-on:change="inquiryFile($event)" ref="inquiryFile">
                <button type="button" class="col-md-3 col-lg-3" v-on:click="openInquiryFile()">ფაილის არჩევა&nbsp;<BIconFolder2 /></button>
                <span>ცნობა ან/და შედარების აქტი სსიპ - შემოსავლების სამსახურიდან დავალიანების არარსებობის შესახებ.</span>
            </div>
        </div>
    </div>

    <!-- თანამონაწილეობის ფაილის ბლოკი -->
    <div class="row">
        <div class="mb-3 mt-4 col-lg-12 col-md-12 col-xs-12 col-sm-12">
            <div class="file_block p-3">
                <input type="file" v-on:change="complicityFile($event)" ref="complicityFile">
                <button type="button" class="col-md-3 col-lg-3" v-on:click="openComplicityFile()">ფაილის არჩევა&nbsp;<BIconFolder2 /></button>
                <span>თანამონაწილეობის თანხის დამადასტურებელი დოკუმენტი - ცნობა/ამონაწერი/ხელშეკრულება ბანკიდან შესაბამისი თანხის ანგარიშზე არსებობის შესახებ ან/და ცნობა ბანკიდან / საფინანსო ინსტიტუტიდან კრედიტის/ლიზინგის/ დამტკიცების თაობაზე.</span>
            </div>
        </div>
    </div>

    <!-- საბანკო რეკვიზიტების ფაილის ბლოკი -->
    <div class="row">
        <div class="mb-3 mt-4 col-lg-12 col-md-12 col-xs-12 col-sm-12">
            <div class="file_block p-3">
                <input type="file" v-on:change="bankFile($event)" ref="accountFile">
                <button type="button" class="col-md-3 col-lg-3" v-on:click="bankAccountDetails()">ფაილის არჩევა&nbsp;<BIconFolder2 /></button>
                <span>საბანკო რეკვიზიტები.</span>
            </div>
        </div>
    </div>

    <!-- სამხარაულის დოკუმენტების ფაილის ბლოკი -->
    <div class="row">
        <div class="mb-3 mt-4 col-lg-12 col-md-12 col-xs-12 col-sm-12">
            <div class="file_block p-3">
                <input type="file" v-on:change="experticeFile($event)" ref="examinFile">
                <button type="button" class="col-md-3 col-lg-3" v-on:click="openExaminationFile()">ფაილის არჩევა&nbsp;<BIconFolder2 /></button>
                <span>სსიპ ლევან სამხარაულის სახელობის სასამართლო ექსპერტიზის ბიუროს ან/და სსიპ „აკრედიტაციის ეროვნული ორგანოს - აკრედიტაციის ცენტრის“ მიერ აკრედიტირებული პირების ან/და საქართველოს ფინანსთა სამინისტროს სისტემაში შემავალი სახელმწიფო საქვეუწყებო დაწესებულების - ბუღალტრული აღრიცხვის, ანგარიშგებისა და აუდიტის ზედამხედველობის სამსახურის მიერ წარმოებულ რეესტრში არსებული პირის საექსპერტო/აუდიტორული დასკვნა წარმოდგენილი პროექტის საინვესტიციო ღირებულების საბაზრო ფასებთან შესაბამისობის შესახებ.</span>
            </div>
        </div>
    </div>

    <!-- დამატებითი დოკუმენტების ფაილის ბლოკი -->
    <div class="row">
        <div class="mb-3 mt-4 col-lg-12 col-md-12 col-xs-12 col-sm-12">
            <div class="file_block p-3">
                <input type="file" v-on:change="additionalDocuments($event)" ref="additional" multiple>
                <button type="button" class="col-md-3 col-lg-3" v-on:click="openAdditionalFiles()">ფაილის არჩევა&nbsp;<BIconFolder2 /></button>
                <span>სხვა დამატებითი დოკუმენტაცია, სააგენტოს მიერ მოთხოვნის შემთხვევაში.</span>
            </div>
        </div>
    </div>
</template>